# 🧪 Testing Instructions for StudyPlanner Pro

Follow these comprehensive, step-by-step instructions to test StudyPlanner Pro locally and ensure all features work correctly. This guide reflects the updated Modular JavaScript structure and modern Firebase integration.

---

## 🚀 Local Testing Prerequisites

> 💡 **Important**: Because this project uses JavaScript Modules, you **cannot** test by simply double-clicking the HTML files. You **must** use a local server (like the VS Code "Live Server" extension) or the browser will block the scripts.

---

## 🛠️ Step-by-Step Testing Process

### 1. Open the Application
- Open your project folder in VS Code.
- Right-click `index.html` and select **"Open with Live Server"**.
- The landing page should load with your unified design and theme.

### 2. Test Authentication Flow
Verify that user account creation and sign-in work properly:
- **Sign Up**: Navigate to the Sign In page and attempt to create a new account.
- **Validation**: 
  - Try submitting with an empty email or a password shorter than 6 characters. 
  - Ensure the system prevents submission and shows a toast notification.
- **Redirection**: Upon successful sign-up/login, verify that you are automatically redirected to `app.html` (the Dashboard).

### 3. Test Firebase Connection
- **Check Configuration**: Ensure your credentials in `Assets/js/firebase-config.js` match your Firebase Console.
- **Auth Observer**: 
  - Log in, then manually try to visit `auth.html`. The app should kick you back to `app.html`.
  - Log out, then manually try to visit `app.html`. The app should kick you back to `auth.html`.
- **User Data**: Visit `profile.html` and verify your email and initials appear correctly based on your login.

### 4. Test Main Dashboard Features

#### 🌓 Theme Toggle
- Click the theme toggle icon in the header.
- Verify the transition between light and dark modes is smooth.
- Refresh the page; verify that your theme choice is remembered (via `localStorage`).

#### 📅 Schedule Generator
- Enter a title and a few subjects (e.g., "Math, Science, History").
- Click **"Save Schedule"**.
- Verify the schedule appears in the list below the form instantly.

#### 📝 Assignment Tracker
- Add an assignment name and click **"Add Task"**.
- Verify it appears in the task list.
- Click the **"Delete" (X)** button on an assignment and verify it is removed from the UI and the database.

#### ⏱️ Pomodoro Timer
- Click **"Start Focus Session"**.
- Verify the timer begins counting down from 25:00.
- Click **"Pause"** and verify it stops.

### 5. Test Responsiveness
- Open Browser DevTools (F12) and toggle the **Device Toolbar**.
- Test the layout on **Mobile** (iPhone/Android), **Tablet**, and **Desktop** widths.
- Ensure buttons remain clickable and text does not overlap or overflow.

### 6. Test Data Persistence
- Create a schedule and an assignment.
- **Refresh the page**.
- If the items remain on the screen after the refresh, the **Firestore Real-time Listeners** are working correctly.

---

## ✅ Quick Verification Checklist

- [ ] **Authentication**: Users can sign up, log in, and log out.
- [ ] **Security**: Logged-out users cannot access `app.html`, `profile.html`, or `settings.html`.
- [ ] **Database**: Schedules and Assignments save to Firebase and persist after refresh.
- [ ] **UI/UX**: Dark mode works globally and Toast notifications appear for errors.
- [ ] **Performance**: No "compat" errors or 404s appear in the Browser Console (F12).

---

## 🆘 Troubleshooting Guide

| Issue | Likely Cause | Solution |
| :--- | :--- | :--- |
| **Blank Page** | Not using a server | Right-click `index.html` and use **Live Server**. |
| **Auth Errors** | Firebase Setup | Ensure **Email/Password** is enabled in Firebase Auth Console. |
| **Data not saving** | Database Rules | Ensure Firestore is set to **Test Mode** (allow read/write). |
| **CORS / Module Error** | Script tag issue | Ensure HTML has `<script type="module" src="...">`. |

---
**Happy Testing!** 📚✨
*Version 2.0.0 | August 2026*
