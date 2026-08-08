import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initTheme } from './ui-utils.js';
import { initAuthForms, logout } from './auth-logic.js';
import { initScheduleGenerator, initPomodoroTimer } from './app-logic.js';

// 1. Setup Theme
initTheme();

// 2. Handle Authentication State
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;

    if (user) {
        // --- 1. THE REDIRECT (REPLACE THE OLD LINE WITH THIS) ---
        if (path === '/' || path.endsWith('/') || path.includes('auth.html') || path.includes('index.html')) {
            window.location.href = 'app.html';
            return; // Stop running the rest of the code since we are changing pages
        }

        // --- 2. FILL PROFILE DATA ---
        if (path.includes('profile.html')) {
            // ... initials and email logic ...
        }

        // --- 3. START TOOLS ---
        if (path.includes('app.html')) {
            // ... init functions ...
        }
    } else {
        // ... logout logic ...
    }
});