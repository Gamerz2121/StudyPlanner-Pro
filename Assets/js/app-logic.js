import { db, auth } from './firebase-config.js';
import { 
    collection, addDoc, onSnapshot, query, where, orderBy, deleteDoc, doc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { showToast } from './ui-utils.js';

export function initScheduleGenerator() {
    const form = document.getElementById('schedule-form');
    const list = document.getElementById('schedule-list');
    if (!form || !list) return;

    const q = query(collection(db, 'schedules'), where('userId', '==', auth.currentUser.uid), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snap) => {
        list.innerHTML = '';
        snap.forEach(d => {
            const item = document.createElement('div');
            item.className = 'schedule-item';
            item.innerHTML = `<h3>${d.data().title}</h3><button class="del-btn" data-id="${d.id}">Delete</button>`;
            list.appendChild(item);
        });
    });

    form.onsubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'schedules'), {
            title: form.title.value,
            userId: auth.currentUser.uid,
            createdAt: serverTimestamp()
        });
        form.reset();
    };
}

export function initPomodoroTimer() {
    const display = document.getElementById('timer-display');
    const btn = document.getElementById('start-timer');
    if (!display || !btn) return;

    let timeLeft = 25 * 60;
    btn.onclick = () => {
        setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                const mins = Math.floor(timeLeft / 60);
                const secs = timeLeft % 60;
                display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            }
        }, 1000);
    };
}

// Global Delete Listener
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('del-btn')) {
        deleteDoc(doc(db, 'schedules', e.target.dataset.id));
    }
});