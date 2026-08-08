import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCnMAn4kChPk-OEinBDmB-Ji28-yLQhf8c",
    authDomain: "study-plannerpro.firebaseapp.com",
    projectId: "study-plannerpro",
    storageBucket: "study-plannerpro.firebasestorage.app",
    messagingSenderId: "965299534779",
    appId: "1:965299534779:web:e5dea3bc8b707f551fe29e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);