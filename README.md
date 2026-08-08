# StudyPlanner Pro - Free Study Schedule Generator with User Accounts

A completely free web application that helps students create personalized study schedules, track assignments, and use a Pomodoro timer - now with user accounts so your data saves across devices!

## � ✨ New Features

- **User Accounts**: Sign up with email/password to save your schedules and assignments across devices
- **Welcome Tour**: Guided introduction for new users
- **Interactive Tutorial**: Step-by-step walkthrough of all features
- **Progress Tracking**: Get congratulated when you create your first schedule
- **Secure Data Storage**: Uses Firebase Authentication and Firestore for reliable data persistence

## Features

- **Study Schedule Generator**: Create personalized study plans based on your subjects, available time, and deadlines
- **Assignment Tracker**: Keep track of homework and projects with due dates and priority levels
- **Pomodoro Timer**: Built-in focus timer to improve study sessions
- **User Accounts**: Save your data securely and access it from any device
- **Welcome Experience**: Onboarding flow with welcome message and tutorial
- **First-Schedule Recognition**: Celebrate when you create your first study plan
- **100% Client-Side**: Works entirely in your browser with secure backend
- **Data Privacy**: Your data belongs to you - we never sell or share it
- **Free to Host**: Can be deployed for free on Netlify or similar services

## How to Deploy for Free (No Coding Experience Needed)

### Option 1: Netlify (Recommended since you've used it before)

1. **Create a Firebase project** (required for user accounts):
   - Go to [firebase.google.com](https://firebase.google.com/) and click "Get started"
   - Create a new project (name it something like "studyplanner-pro")
   - Disable Google Analytics (not needed for now)
   - In Firebase console:
     - Enable Authentication → Sign-in method → Email/Password → Enable
     - Create Firestore Database → Start in test mode → Enable
     - Get your Firebase config from Project Settings → Your apps → Web app
   - Replace the Firebase config values in `script.js` with your actual values:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

2. **Deploy to Netlify**:
   - Create a Netlify account at [app.netlify.com](https://app.netlify.com/signup) (free)
   - Click "New site from Git"
   - Connect your GitHub account (create one at github.com if needed)
   - Create a new repository and push your files to it
   - Select your repository in Netlify
   - Leave build settings blank (it's a static site)
   - Click "Deploy site"
   - Your site will be live at a Netlify subdomain (you can customize it in site settings)

### Option 2: GitHub Pages (Alternative)

1. **Create a Firebase project** (follow steps 1 above)
2. **Create a GitHub account** at [github.com](https://github.com) (free)
3. **Create a new repository**:
   - Click the "+" button in the top-right and select "New repository"
   - Name it `studyplanner-pro` (or any name you like)
   - Make sure it's set to "Public"
   - Click "Create repository"
4. **Upload the files**:
   - Click "Add file" → "Upload files"
   - Drag and drop all files from this folder (`index.html`, `style.css`, `script.js`, `README.md`)
   - Scroll down and click "Commit changes"
5. **Enable GitHub Pages**:
   - Go to the "Settings" tab in your repository
   - Click "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose branch: `main`, folder: `/ (root)`
   - Click "Save"
   - Wait a minute, then your site will be live at `https://yourusername.github.io/studyplanner-pro/`

## How to Use the Application

Once deployed, simply visit your site URL and:

### 1. Sign Up / Log In
- Click "Sign Up" to create an account with your email and password
- Or click "Log In" if you already have an account
- Your data will be saved securely to your Firebase account

### 2. Study Schedule Generator
- Enter your subjects (comma-separated)
- Specify your daily available study hours
- Enter days until your exam/deadline
- Click "Generate Schedule" to see your personalized plan
- Use "Download as Text" to save your schedule

### 3. Assignment Tracker
- Add assignments with name, due date, and priority (Low/Medium/High)
- Assignments are saved to your account and persist between devices
- Delete assignments by clicking the "Delete" button

### 4. Pomodoro Timer
- Set work and break minutes (defaults: 25 work, 5 break)
- Click "Start" to begin the timer
- Click "Pause" to pause/resume
- Click "Reset" to restart
- The timer will alert you when sessions change

### 5. Welcome Experience
- After logging in for the first time, you'll see a welcome message
- Followed by an interactive tutorial that highlights key features
- Both can be dismissed if you prefer to explore on your own

### 6. First Schedule Recognition
- When you create your first study schedule, you'll see a celebratory message
- With suggestions to try other features like the assignment tracker or pomodoro timer

## �� 🎯 Why This Works for Students

- **No Lost Data**: Your schedules and assignments save to your account, not just your browser
- **Access Anywhere**: Log in from any device and see your data
- **Secure**: Firebase handles authentication security - no need to build login systems
- **Free Tier Generous**: Firebase's free cover plenty of usage for student projects
- **Real-Time Sync**: Changes save instantly across devices

## �� 💡 Monetization Ideas (Zero Upfront Cost)

You can monetize this web app without spending money:

1. **Affiliate Marketing**:
   - Recommend study tools (Notion, Todoist, Focus@Will) with affiliate links
   - Promote stationery, planners, or tech accessories
   - Sign up for free at Amazon Associates, ShareASale, or individual program websites

2. **Display Ads**:
   - Apply for Google AdSense once you get traffic
   - Use ad networks like Media.net or Carbon Ads

3. **Sponsorships**:
   - Target microsponsors (tutoring services, essay editors, student brands)
   - Offer newsletter or tool sponsorships

4. **Digital Products**:
   - Sell premium study templates (Notion, PDF bundles) via Gumroad (free to start)
   - Create exam prep guides or study planners

5. **Freemium Upsell**:
   - Keep core tools free
   - Offer advanced features (detailed analytics, AI tutor chat) as low-cost subscription

## �� 🔧 Customization (Optional - No Coding Required)

If you want to customize the appearance or text without coding:

1. **Change colors/text** in `style.css`:
   - Look for colors like `#667eea` and `#764ba2` (the purple gradient)
   - Replace them with your preferred colors
   - Update text in `index.html` (like the title or descriptions)

2. **Add your own content**:
   - Edit `index.html` to add more sections or information
   - Add affiliate links or sponsorship sections

## �� 📞 Support and Updates

This application is designed to be simple and reliable. If you encounter issues:

1. **Check browser console** (F12 → Console tab) for errors
2. **Clear browser cache** if updates don't appear
3. **Ensure JavaScript is enabled** in your browser settings
4. **Verify your Firebase config** is correctly set in `script.js`

The app uses standard web technologies that work in all modern browsers.

## �� 📝 Important Notes About Firebase

- **Test Mode**: For development, we're using Firestore in test mode. For production applications with real users, you'll want to set proper security rules.
- **Security Rules**: The app includes basic security rules that ensure users can only access their own data.
- **Free Limits**: Firebase's free tier includes 50k monthly authentications, 1GB storage, etc. - plenty for getting started.
- **Upgrade Path**: If your app grows significantly, Firebase offers paid plans with higher limits.

---

**Remember**: The most important part is providing value to students. Focus on sharing your site in relevant communities (Reddit study groups, Discord servers, Quora, Pinterest) to build initial traffic before implementing monetization strategies.

Good luck with your free web app! �� 🎓���🚀

### �� 🙋‍�♀��️ Questions?

If you run into issues setting up Firebase or deploying, check:
1. Browser console for error messages (F12 → Console tab)
2. Firebase project settings to ensure your config values are correct
3. Netlify deploy logs if deploying that way
4. Firebase Authentication and Firestore sections in the console to see if data is being saved