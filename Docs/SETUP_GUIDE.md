# 📖 StudyPlanner Pro Firebase Setup Guide

Follow this comprehensive, step-by-step guide to set up Firebase for StudyPlanner Pro and deploy your app for free! Whether you're a complete beginner or have some technical experience, this guide will walk you through everything you need to know.

## 📋 Prerequisites

Before we begin, make sure you have:
- **A Google account** (Gmail or any Google service account).
- **Basic computer skills** (ability to copy/paste text and use a web browser).
- **Approximately 15 minutes** of focused time.
- **A modern web browser** (Chrome, Firefox, Safari, or Edge).
- **Access to your preferred text editor** (VS Code is highly recommended).

> 💡 **Note**: Because this project uses JavaScript Modules, you **must** use a local server (like the VS Code "Live Server" extension) to test it on your computer.

---

## 🚀 Step 1: Create Your Firebase Project

### 1.1 Access Firebase Console
- Open your web browser and go to: [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Sign in with your Google account.
- Click the **"Add project"** button.

### 1.2 Create Project
- Project name: `studyplanner-pro` (or any name you like).
- **Important**: Read the terms and accept them.
- **Optional**: Toggle off "Enable Google Analytics" for a faster setup.
- Click **"Create project"** and wait for initialization.

---

## 🔐 Step 2: Enable Authentication

### 2.1 Navigate to Authentication
- In the left-hand menu of your Firebase dashboard, click **"Build"** then select **"Authentication"**.
- Click **"Get started"**.
- Select the **"Sign-in method"** tab at the top.

### 2.2 Enable Email/Password
- Click on the **"Email/Password"** provider.
- Toggle the switch to **Enable** and click **"Save"**.

---

## 🗄️ Step 3: Create Firestore Database

### 3.1 Access Firestore
- In the left-hand menu, click **"Firestore Database"**.
- Click the **"Create database"** button.

### 3.2 Configure Database Settings
- **Database Mode**: Select **"Start in test mode"**. This allows your app to read and write data immediately while you are developing.
- **Location**: Choose a region closest to you (e.g., `us-central1`).
- Click **"Enable"**.

---

## ⚙️ Step 4: Get Your Configuration

### 4.1 Register Your Web App
- Click the **Gear Icon** (Project Settings) at the top left next to "Project Overview".
- Scroll down to the "Your apps" section and click the **Web icon (</>)**.
- App nickname: `StudyPlanner Pro`.
- **Important**: Leave "Firebase Hosting" unchecked for now.
- Click **"Register app"**.

### 4.2 Copy the Configuration
- You will see a block of code containing a `firebaseConfig` object.
- **Copy the values** for `apiKey`, `authDomain`, `projectId`, etc.

---

## 📝 Step 5: Update Your Code

### 5.1 Edit firebase-config.js
- Open your project folder in your text editor.
- Open the file located at: `Assets/js/firebase-config.js`.
- Replace the placeholder values with the real ones you just copied from the Firebase Console.
- **Save the file.**

---

## ✅ Step 6: Test Everything Locally

### 6.1 Use Live Server
- Open VS Code.
- Right-click `index.html` and select **"Open with Live Server"**.
- *If you don't have this option, install the "Live Server" extension from the VS Code Marketplace.*

### 6.2 Verify the Features
1. **Sign Up**: Go to the login page and create a test account.
2. **Dashboard**: You should be automatically redirected to `app.html`.
3. **Persistance**: Create a study schedule or an assignment, then refresh the page. If the data stays there, your connection to Firebase is perfect!

---

## 🌐 Step 7: Deploy for Free

### Option A: Netlify (Easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop your **entire project folder** into the browser window.
3. Your site will be live instantly with a public link!

### Option B: GitHub Pages
1. Push your project to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under "Branch", select `main` (or `master`) and click **Save**.

---

## 🎉 Step 8: Success!

Congratulations! You have successfully turned a static website into a professional, cloud-powered application. 

- **Secure Data**: Every user has their own private workspace.
- **Real-time Sync**: Your data is saved automatically as you work.
- **Dark Mode**: Your theme preference is remembered across all pages.

**Happy Studying!** 📚✨

---
*Last updated: August 2026*
---

*This guide was last updated: August 2026*  
*For the most current information, always refer to:*
- *Firebase Console: https://console.firebase.google.com/*
- *Netlify Docs: https://docs.netlify.com/*
- *GitHub Pages Docs: https://docs.github.com/en/pages*
