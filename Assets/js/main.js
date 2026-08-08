import { auth } from './firebase-config.js';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initTheme, showToast } from './ui-utils.js';
import { initScheduleGenerator, initAssignmentTracker, initPomodoroTimer } from './app-logic.js';

// Initialize UI
initTheme();

// 1. THE BRAIN: Auth State Watcher
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;

    if (user) {
        console.log("Logged in as:", user.email);

        // --- REDIRECT LOGIC ---
        // If logged in and trying to see landing/auth pages, go to the dashboard
        if (path === '/' || path.endsWith('/') || path.includes('index.html') || path.includes('auth.html')) {
            window.location.href = 'app.html';
            return; // Stop running code below because we are changing pages
        }

        // --- LOAD FEATURES ---
        // Initialize dashboard tools only if we are actually on the app page
        if (path.includes('app.html')) {
            initScheduleGenerator();
            initAssignmentTracker();
            initPomodoroTimer();
        }
    } else {
        console.log("No user found.");
        
        // --- SECURITY GUARD ---
        // If logged out and trying to see private pages, kick back to login
        if (path.includes('app.html') || path.includes('profile.html') || path.includes('settings.html')) {
            window.location.href = 'auth.html';
        }
    }
});

// 2. LOGIN LOGIC
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            showToast("Welcome back! Redirecting...");
            // onAuthStateChanged will handle the redirect
        } catch (error) {
            showToast(error.message, "error");
        }
    });
}

// 3. LOGOUT LOGIC
document.getElementById('logout-button')?.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'auth.html';
});