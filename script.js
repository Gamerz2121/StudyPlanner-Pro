// StudyPlanner Pro - JavaScript with Firebase Authentication (Refined)
document.addEventListener('DOMContentLoaded', async function() {
    // === FIREBASE CONFIGURATION ===
    // REPLACE THESE VALUES WITH YOUR ACTUAL FIREBASE CONFIG
   // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnmAn4kChPk-OEinBDmB-Ji28-yLQhf8c",
  authDomain: "study-plannerpro.firebaseapp.com",
  projectId: "study-plannerpro",
  storageBucket: "study-plannerpro.firebasestorage.app",
  messagingSenderId: "965299534779",
  appId: "1:965299534779:web:e5dea3bc8b707f551fe29e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

    // Initialize Firebase (only once)
    let firebaseApp;
    try {
        firebaseApp = firebase.initializeApp(firebaseConfig);
    } catch (error) {
        if (error.code !== 'app/duplicate-app') {
            console.error("Firebase initialization error:", error);
            showAuthMessage("Failed to initialize app. Please check configuration.", true);
            return;
        }
        firebaseApp = firebase.app(); // Use existing app
    }

    const auth = firebaseApp.auth();
    const db = firebaseApp.firestore();

    // Enable persistence (works in most browsers)
    await firebaseApp.auth().setPersistence(firebaseApp.auth.Auth.Persistence.LOCAL);

    // === DOM ELEMENTS ===
    const yearSpan = document.getElementById('year');
    const authModal = document.getElementById('authModal');
    const authContent = document.getElementById('authContent');
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const authForm = document.getElementById('authForm');
    const authEmail = document.getElementById('authEmail');
    const authPassword = document.getElementById('authPassword');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const switchLink = document.getElementById('switchLink');
    const switchForm = document.getElementById('switchForm');
    const authMessage = document.getElementById('authMessage');

    const scheduleForm = document.getElementById('scheduleForm');
    const subjectsInput = document.getElementById('subjects');
    const hoursPerDayInput = document.getElementById('hoursPerDay');
    const daysUntilExamInput = document.getElementById('daysUntilExam');
    const scheduleResult = document.getElementById('scheduleResult');
    const scheduleOutput = document.getElementById('scheduleOutput');
    const downloadScheduleBtn = document.getElementById('downloadSchedule');

    const assignmentForm = document.getElementById('assignmentForm');
    const assignmentNameInput = document.getElementById('assignmentName');
    const dueDateInput = document.getElementById('dueDate');
    const prioritySelect = document.getElementById('priority');
    const assignmentItems = document.getElementById('assignmentItems');
    const noAssignments = document.getElementById('noAssignments');

    const timerDisplay = document.getElementById('timerDisplay');
    const startTimerBtn = document.getElementById('startTimer');
    const pauseTimerBtn = document.getElementById('pauseTimer');
    const resetTimerBtn = document.getElementById('resetTimer');
    const workMinutesInput = document.getElementById('workMinutes');
    const breakMinutesInput = document.getElementById('breakMinutes');

    // === STATE ===
    let currentUser = null;
    let isWorking = true;
    let timeLeft = workMinutesInput.value * 60;
    let timerInterval = null;
    let assignmentsUnsubscribe = null;

    // === INITIALIZATION ===
    yearSpan.textContent = new Date().getFullYear();
    initializeTimerDisplay();

    // === AUTH STATE LISTENER ===
    const authListener = auth.onAuthStateChanged(async (user) => {
        currentUser = user;
        if (user) {
            // User signed in
            authModal.style.display = 'none';
            clearAuthForm();
            await loadUserData();
            await showWelcomeIfNeeded();     // Welcome message
            await initializeTutorial();      // Tutorial walkthrough
            // Note: First schedule follow-up happens automatically when they create a schedule
        } else {
            // User signed out
            clearLocalData();
            authModal.style.display = 'block';
            // Clean up any active listeners
            if (assignmentsUnsubscribe) {
                assignmentsUnsubscribe();
                assignmentsUnsubscribe = null;
            }
            assignmentItems.innerHTML = '';
            noAssignments.classList.remove('hidden');
        }
    });

    // === EVENT LISTENERS ===
    // Auth tab switching
    loginTab.addEventListener('click', () => switchToLogin());
    signupTab.addEventListener('click', () => switchToSignup());

    // Auth form submission
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleAuthSubmit();
    });

    // Switch form link
    switchForm.addEventListener('click', (e) => {
        if (e.target.id === 'switchLink') {
            e.preventDefault();
            if (signupTab.classList.contains('active')) {
                switchToLogin();
            } else {
                switchToSignup();
            }
        }
    });

    // Schedule form
    scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleScheduleGenerate();
    });

    downloadScheduleBtn.addEventListener('click', () => {
        downloadSchedule();
    });

    // Assignment form
    assignmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAssignmentAdd();
    });

    // Timer controls
    startTimerBtn.addEventListener('click', startTimer);
    pauseTimerBtn.addEventListener('click', pauseTimer);
    resetTimerBtn.addEventListener('click', resetTimer);

    workMinutesInput.addEventListener('change', () => {
        if (!timerInterval) {
            timeLeft = parseInt(workMinutesInput.value) * 60;
            initializeTimerDisplay();
        }
    });

    breakMinutesInput.addEventListener('change', () => {
        if (!timerInterval && !isWorking) {
            timeLeft = parseInt(breakMinutesInput.value) * 60;
            initializeTimerDisplay();
        }
    });

    // === AUTH FUNCTIONS ===
    function switchToLogin() {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        authSubmitBtn.textContent = 'Sign In';
        switchLink.textContent = 'Sign Up';
        switchForm.innerHTML = "Don't have an account? <span id='switchLink'>Sign Up</span>";
        clearAuthMessage();
    }

    function switchToSignup() {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        authSubmitBtn.textContent = 'Sign Up';
        switchLink.textContent = 'Log In';
        switchForm.innerHTML = "Already have an account? <span id='switchLink'>Log In</span>";
        clearAuthMessage();
    }

    async function handleAuthSubmit() {
        const email = authEmail.value.trim();
        const password = authPassword.value;

        if (!email || !password) {
            showAuthMessage("Please fill in all fields", true);
            return;
        }

        if (password.length < 6) {
            showAuthMessage("Password must be at least 6 characters", true);
            return;
        }

        authSubmitBtn.disabled = true;
        showAuthMessage("", false);

        try {
            if (authSubmitBtn.textContent === 'Sign Up') {
                await auth.createUserWithEmailAndPassword(email, password);
            } else {
                await auth.signInWithEmailAndPassword(email, password);
            }
            clearAuthMessage();
        } catch (error) {
            console.error("Auth error:", error);
            let message = "Authentication failed";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = "This email is already registered";
                    break;
                case 'auth/invalid-email':
                    message = "Please enter a valid email address";
                    break;
                case 'auth/weak-password':
                    message = "Password should be at least 6 characters";
                    break;
                case 'auth/user-disabled':
                    message = "This account has been disabled";
                    break;
                case 'auth/user-not-found':
                    message = "No account found with this email";
                    break;
                case 'auth/wrong-password':
                    message = "Incorrect password";
                    break;
                case 'auth/too-many-requests':
                    message = "Too many attempts. Try again later";
                    break;
                default:
                    message = error.message;
            }
            showAuthMessage(message, true);
        } finally {
            authSubmitBtn.disabled = false;
        }
    }

    function clearAuthForm() {
        authEmail.value = '';
        authPassword.value = '';
        clearAuthMessage();
    }

    function showAuthMessage(message, isError = false) {
        authMessage.textContent = message;
        authMessage.style.color = isError ? '#d32f2f' : '#388e3c';
        authMessage.style.minHeight = '20px';
    }

    function clearAuthMessage() {
        authMessage.textContent = '';
        authMessage.style.minHeight = '0px';
    }

    // === SCHEDULE FUNCTIONS ===
    function handleScheduleGenerate() {
        const subjects = subjectsInput.value.trim();
        const hoursPerDay = parseFloat(hoursPerDayInput.value);
        const daysUntilExam = parseInt(daysUntilExamInput.value);

        if (!subjects || isNaN(hoursPerDay) || isNaN(daysUntilExam)) {
            showAlert("Please fill in all fields correctly");
            return;
        }

        const subjectsArray = subjects.split(',').map(s => s.trim()).filter(s => s.length > 0);
        if (subjectsArray.length === 0) {
            showAlert("Please enter at least one subject");
            return;
        }

        const schedule = generateStudySchedule(subjectsArray, hoursPerDay, daysUntilExam);
        scheduleOutput.textContent = schedule;
        scheduleResult.classList.remove('hidden');

        // Save to Firestore if user logged in
        if (currentUser) {
            saveScheduleToFirestore(schedule, subjectsArray, hoursPerDay, daysUntilExam);
        }

        // Check if this is their first schedule
        showFirstScheduleFollowUp();
    }

    function downloadSchedule() {
        if (!scheduleOutput.textContent.trim()) {
            showAlert("No schedule to download");
            return;
        }
        const blob = new Blob([scheduleOutput.textContent], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'study_schedule.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // === ASSIGNMENT FUNCTIONS ===
    function handleAssignmentAdd() {
        const name = assignmentNameInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = prioritySelect.value;

        if (!name || !dueDate) {
            showAlert("Please fill in assignment name and due date");
            return;
        }

        const assignment = {
            id: Date.now().toString(),
            name,
            dueDate,
            priority,
            userId: currentUser ? currentUser.uid : null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (currentUser) {
            saveAssignmentToFirestore(assignment);
        } else {
            // Fallback (shouldn't happen with auth modal)
            let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
            assignments.push({...assignment, id: Date.now()});
            localStorage.setItem('assignments', JSON.stringify(assignments));
            renderAssignmentList();
        }

        // Reset form
        assignmentForm.reset();
        prioritySelect.value = 'medium';
    }

    function loadUserData() {
        if (!currentUser) return;

        // Clean up previous listener
        if (assignmentsUnsubscribe) {
            assignmentsUnsubscribe();
        }

        // Set up real-time listener for assignments
        assignmentsUnsubscribe = db.collection('assignments')
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const assignments = [];
                snapshot.forEach(doc => {
                    assignments.push({ id: doc.id, ...doc.data() });
                });
                renderAssignmentList(assignments);
            }, (error) => {
                console.error("Firestore listener error:", error);
                showAlert("Could not load assignments. Using local data as fallback.", true);
                loadAssignmentsFromLocalStorage();
            });
    }

    function renderAssignmentList(assignments = []) {
        if (assignments.length === 0) {
            noAssignments.classList.remove('hidden');
            assignmentItems.innerHTML = '';
        } else {
            noAssignments.classList.add('hidden');
            assignmentItems.innerHTML = assignments.map(assign => `
                <li>
                    <div class="assignment-info">
                        <div class="assignment-name">${assign.name}</div>
                        <div class="assignment-date">Due: ${new Date(assign.dueDate).toLocaleDateString()}</div>
                    </div>
                    <span class="priority-tag priority-${assign.priority}">${assign.priority.charAt(0).toUpperCase() + assign.priority.slice(1)}</span>
                    <button class="delete-btn" data-id="${assign.id}">Delete</button>
                </li>
            `).join('');

            // Add delete event listeners
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-id');
                    deleteAssignmentFromFirestore(id);
                });
            });
        }
    }

    function loadAssignmentsFromLocalStorage() {
        let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
        // Filter for current user only
        assignments = assignments.filter(a => a.userId === currentUser.uid);
        renderAssignmentList(assignments);
    }

    async function saveAssignmentToFirestore(assignment) {
        if (!currentUser) return;
        try {
            await db.collection('assignments').add(assignment);
            // Note: Realtime listener will update the UI
        } catch (error) {
            console.error("Error saving assignment:", error);
            showAlert("Failed to save assignment. Trying local storage...", true);
            // Fallback to localStorage
            let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
            assignments.push({...assignment, id: Date.now()});
            localStorage.setItem('assignments', JSON.stringify(assignments));
            renderAssignmentList();
        }
    }

    async function deleteAssignmentFromFirestore(id) {
        if (!currentUser) return;
        try {
            await db.collection('assignments').doc(id).delete();
            // Note: Realtime listener will update the UI
        } catch (error) {
            console.error("Error deleting assignment:", error);
            showAlert("Failed to delete assignment", true);
        }
    }

    // === FIRESTORE FUNCTIONS ===
    function saveScheduleToFirestore(schedule, subjects, hoursPerDay, daysUntilExam) {
        if (!currentUser) return;
        db.collection('schedules').add({
            userId: currentUser.uid,
            scheduleText: schedule,
            subjects: subjects,
            hoursPerDay: hoursPerDay,
            daysUntilExam: daysUntilExam,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log("Schedule saved successfully!");
        })
        .catch(error => {
            console.error("Error saving schedule:", error);
        });
    }

    // === TIMER FUNCTIONS ===
    function initializeTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (timerInterval !== null) return;

        timerInterval = setInterval(() => {
            timeLeft--;

            if (timeLeft < 0) {
                isWorking = !isWorking;
                timeLeft = isWorking ?
                    parseInt(workMinutesInput.value) * 60 :
                    parseInt(breakMinutesInput.value) * 60;

                // Show notification
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification(isWorking ? 'Break over! Get back to work.' : 'Work time! Focus on your task.');
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            new Notification(isWorking ? 'Break over! Get back to work.' : 'Work time! Focus on your task.');
                        }
                    });
                }

                // Fallback alert
                alert(isWorking ? 'Break time! Get back to work.' : 'Work time! Focus on your task.');
            }

            initializeTimerDisplay();
        }, 1000);

        startTimerBtn.disabled = true;
        pauseTimerBtn.disabled = false;
    }

    function pauseTimer() {
        if (timerInterval === null) return;
        clearInterval(timerInterval);
        timerInterval = null;
        startTimerBtn.disabled = false;
        pauseTimerBtn.disabled = true;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        isWorking = true;
        timeLeft = parseInt(workMinutesInput.value) * 60;
        initializeTimerDisplay();
        startTimerBtn.disabled = false;
        pauseTimerBtn.disabled = true;
    }

    // === STUDY SCHEDULE GENERATOR ===
    function generateStudySchedule(subjects, hoursPerDay, daysUntilExam) {
        const totalHours = hoursPerDay * daysUntilExam;
        const hoursPerSubject = totalHours / subjects.length;

        let schedule = `Study Schedule for ${daysUntilExam} Days\n`;
        schedule += `Total Study Time: ${totalHours.toFixed(1)} hours\n`;
        schedule += `Daily Study Time: ${hoursPerDay} hours\n`;
        schedule += `Subjects: ${subjects.join(', ')}\n\n`;

        schedule += "DAILY BREAKDOWN:\n";
        schedule += "-".repeat(40) + "\n";

        for (let day = 1; day <= daysUntilExam; day++) {
            schedule += `Day ${day}:\n`;
            subjects.forEach((subject, index) => {
                const subjectHours = hoursPerSubject / daysUntilExam;
                schedule += `  ${subject}: ${subjectHours.toFixed(1)} hours\n`;
            });
            schedule += "\n";
        }

        schedule += "TIPS:\n";
        schedule += "- Take short breaks every 25-30 minutes (Pomodoro technique)\n";
        schedule += "- Review material actively, not just passively reading\n";
        schedule += "- Get adequate sleep and exercise for better retention\n";
        schedule += "- Adjust schedule as needed based on your progress\n";

        return schedule;
    }

    // === HELPER FUNCTIONS ===
    function showAlert(message, isError = false) {
        alert(message);
        if (isError) console.error("Alert:", message);
    }

    function clearLocalData() {
        localStorage.removeItem('assignments');
    }

    // === WELCOME MODAL LOGIC ===
    const welcomeModal = document.getElementById('welcomeModal');
    const closeWelcome = document.getElementById('closeWelcome');
    const skipWelcome = document.getElementById('skipWelcome');
    const startWelcome = document.getElementById('startWelcome');

    // Show welcome modal after successful login (but only once per user)
    async function showWelcomeIfNeeded() {
        if (!currentUser) return;

        // Check if user has seen welcome before (stored in Firestore or localStorage)
        const welcomeShown = localStorage.getItem('welcomeShown_v1');

        // For production, you might want to store this in Firestore instead
        // For simplicity with current setup, using localStorage
        if (!welcomeShown) {
            // Small delay to let auth settle
            setTimeout(() => {
                welcomeModal.style.display = 'flex';
            }, 500);
        }
    }

    // Handle welcome modal actions
    closeWelcome.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        localStorage.setItem('welcomeShown_v1', 'true');
    });

    skipWelcome.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        localStorage.setItem('welcomeShown_v1', 'true');
    });

    startWelcome.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        localStorage.setItem('welcomeShown_v1', 'true');
        // Scroll to schedule generator section
        document.getElementById('scheduleForm').scrollIntoView({ behavior: 'smooth' });
        // Focus on first input
        setTimeout(() => {
            document.getElementById('subjects').focus();
        }, 300);
    });

    // === TUTORIAL WALKTHROUGH SYSTEM ===
    const tutorialModal = document.getElementById('tutorialModal');
    const tutorialClose = document.getElementById('tutorialClose');
    const tutorialPrev = document.getElementById('tutorialPrev');
    const tutorialNext = document.getElementById('tutorialNext');
    const tutorialSkip = document.getElementById('tutorialSkip');
    const tutorialStepContent = document.getElementById('tutorialStepContent');
    const tutorialStep = document.getElementById('tutorialStep');
    const tutorialTotal = document.getElementById('tutorialTotal');

    let currentTutorialStep = 0;
    const tutorialSteps = [
        {
            title: "Create Your First Study Schedule",
            text: "Let's start by generating a personalized study schedule. Tell us your subjects, available study time per day, and when your exam/deadline is.",
            target: "#scheduleForm",
            position: "bottom-center",
            action: () => {
                // Focus on subjects input when showing this step
                setTimeout(() => {
                    document.getElementById('subjects').focus();
                }, 300);
            }
        },
        {
            title: "Track Your Assignments",
            text: "Never miss a deadline again! Use the assignment tracker to add homework, projects, and exams with priorities and due dates.",
            target: "#assignmentForm",
            position: "bottom-center",
            action: () => {
                // Focus on assignment name input
                setTimeout(() => {
                    document.getElementById('assignmentName').focus();
                }, 300);
            }
        },
        {
            title: "Stay Focused with Pomodoro Timer",
            text: "Boost your concentration with our Pomodoro timer. Work in focused 25-minute bursts with automatic break reminders.",
            target: "#timerDisplay",
            position: "center",
            action: () => {
                // Start timer demo
                setTimeout(() => {
                    // Brief timer flash to draw attention
                    const originalColor = timerDisplay.style.color;
                    timerDisplay.style.color = '#667eea';
                    setTimeout(() => {
                        timerDisplay.style.color = originalColor;
                    }, 500);
                }, 500);
            }
        }
    ];

    function showTutorialStep(stepIndex) {
        currentTutorialStep = stepIndex;
        const step = tutorialSteps[stepIndex];

        tutorialStep.textContent = stepIndex + 1;
        tutorialTotal.textContent = tutorialSteps.length;
        tutorialStepContent.innerHTML = `
            <h3 class="tutorial-step-title">${step.title}</h3>
            <p class="tutorial-step-text">${step.text}</p>
        `;

        // Update button states
        tutorialPrev.disabled = stepIndex === 0;
        tutorialNext.textContent = stepIndex === tutorialSteps.length - 1 ? "Got it!" : "Next Step";

        // Remove any existing highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => el.remove());

        // Add highlight to target element
        const targetElement = document.querySelector(step.target);
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const highlight = document.createElement('div');
            highlight.className = 'tutorial-highlight pulsing';
            highlight.style.top = `${rect.top + window.scrollY - 3}px`;
            highlight.style.left = `${rect.left + window.scrollX - 3}px`;
            highlight.style.width = `${rect.width + 6}px`;
            highlight.style.height = `${rect.height + 6}px`;
            document.body.appendChild(highlight);

            // Scroll element into view if needed
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }

        // Execute step-specific action
        if (step.action) step.action();

        // Show modal
        tutorialModal.style.display = 'flex';
    }

    function hideTutorial() {
        tutorialModal.style.display = 'none';
        document.querySelectorAll('.tutorial-highlight').forEach(el => el.remove());
        localStorage.setItem('tutorialCompleted', 'true');
    }

    // Event listeners
    tutorialClose.addEventListener('click', hideTutorial);
    tutorialSkip.addEventListener('click', hideTutorial);
    tutorialPrev.addEventListener('click', () => {
        if (currentTutorialStep > 0) {
            showTutorialStep(currentTutorialStep - 1);
        }
    });
    tutorialNext.addEventListener('click', () => {
        if (currentTutorialStep < tutorialSteps.length - 1) {
            showTutorialStep(currentTutorialStep + 1);
        } else {
            hideTutorial();
        }
    });

    // Initialize tutorial (show if user is logged in and hasn't completed it)
    async function initializeTutorial() {
        if (!currentUser) return;

        const tutorialCompleted = localStorage.getItem('tutorialCompleted');
        if (!tutorialCompleted) {
            // Small delay to let everything settle
            setTimeout(() => {
                showTutorialStep(0);
            }, 1000);
        }
    }

    // === FIRST SCHEDULE FOLLOW-UP MESSAGE SYSTEM ===
    const firstScheduleMessage = document.getElementById('firstScheduleMessage');
    const followUpClose = document.getElementById('followUpClose');
    const tryAssignments = document.getElementById('tryAssignments');
    const tryTimer = document.getElementById('tryTimer');

    // Track if user has created a schedule (using localStorage for simplicity)
    let hasCreatedSchedule = localStorage.getItem('hasCreatedSchedule') === 'true';

    // Show follow-up message after first schedule generation
    async function showFirstScheduleFollowUp() {
        if (!currentUser || hasCreatedSchedule) return;

        // Check if this is actually their first schedule by checking Firestore
        try {
            const schedulesSnapshot = await db.collection('schedules')
                .where('userId', '==', currentUser.uid)
                .limit(1)
                .get();

            // If they have 0 or 1 schedules (the one they just made), show follow-up
            if (schedulesSnapshot.empty || schedulesSnapshot.docs.length === 1) {
                hasCreatedSchedule = true;
                localStorage.setItem('hasCreatedSchedule', 'true');

                // Show message with delay to avoid interfering with schedule generation
                setTimeout(() => {
                    firstScheduleMessage.style.display = 'flex';
                }, 1500);
            }
        } catch (error) {
            console.error("Error checking schedule count:", error);
            // Fallback: just mark as completed to avoid spamming
            hasCreatedSchedule = true;
            localStorage.setItem('hasCreatedSchedule', 'true');
        }
    }

    // Handle follow-up actions
    followUpClose.addEventListener('click', () => {
        firstScheduleMessage.style.display = 'none';
    });

    tryAssignments.addEventListener('click', () => {
        firstScheduleMessage.style.display = 'none';
        // Scroll to assignment tracker
        document.getElementById('assignmentForm').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            document.getElementById('assignmentName').focus();
        }, 300);
    });

    tryTimer.addEventListener('click', () => {
        firstScheduleMessage.style.display = 'none';
        // Scroll to pomodoro timer
        document.querySelector('.tool:nth-child(3)').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            document.getElementById('startTimer').focus();
        }, 300);
    });

    // === CLEANUP ON PAGE UNLOAD ===
    window.addEventListener('beforeunload', () => {
        if (authListener) authListener();
        if (assignmentsUnsubscribe) assignmentsUnsubscribe();
        if (timerInterval) clearInterval(timerInterval);
    });
});