import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { showToast } from './ui-utils.js';

export function initAuthForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, loginForm.email.value, loginForm.password.value)
                .then(() => showToast('Welcome back!', 'success'))
                .catch(err => showToast(err.message, 'error'));
        };
    }

    if (signupForm) {
        signupForm.onsubmit = (e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, signupForm.email.value, signupForm.password.value)
                .then(() => showToast('Account Created!', 'success'))
                .catch(err => showToast(err.message, 'error'));
        };
    }
}

export function logout() {
    signOut(auth).then(() => window.location.href = 'auth.html');
}