# ���� �� �� 📚 StudyPlanner Pro

Your all-in-one study companion for creating personalized study schedules, tracking assignments, and maintaining focus with an integrated Pomodoro timer. Built for students who want to study smarter, not harder.

![StudyPlanner Pro Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=StudyPlanner+Pro+-+Study+Smarter%2C+Not+Harder)

## ���� �� Overview

StudyPlanner Pro is a free, open-source web application that combines three essential student productivity tools into one seamless experience:
- **Smart Study Schedule Generator** - Create customized study plans based on your subjects, available time, and deadlines
- **Intelligent Assignment Tracker** - Organize homework, projects, and exams with due dates and priority levels  
- **Focus-Enhancing Pomodoro Timer** - Work in scientifically-proven intervals to maximize concentration and prevent burnout

Powered by Firebase for secure authentication and real-time data persistence across all your devices, StudyPlanner Pro helps you transform chaotic study sessions into structured, productive learning experiences.

## ���� � �� ✨ Key Features

### ���� �� �� 🎯 Academic Planning Tools
- **Dynamic Schedule Generator**: Input your subjects, daily study hours, and deadline to receive a intelligently distributed study plan that balances workload across all topics
- **Smart Assignment Management**: Track assignments with customizable priorities, due dates, and completion status - never miss a deadline again
- **Visual Progress Tracking**: See your upcoming tasks at a glance with color-coded priority indicators and chronological organization

### ���� �� �� ⏱������️ Focus & Productivity
- **Customizable Pomodoro Timer**: Adjust work and break intervals to match your personal focus rhythm (defaults to proven 25/5 minute cycle)
- **Automatic Session Tracking**: The timer seamlessly transitions between work and break periods with gentle notifications
- **Focus Streaks**: Build productive habits by tracking consecutive completed Pomodoro sessions (upcoming feature)

### ���� �� �� 🔐 Security & Reliability
- **Firebase Authentication**: Secure email/password sign-in with industry-standard encryption
- **Firestore Database**: Real-time synchronization ensures your data is always up-to-date across devices
- **Local Storage Fallback**: Essential preferences load instantly even without internet connection
- **Automatic Backups**: Your study plans and assignments are safely stored in the cloud

### ���� �� �� 🎨 Thoughtful User Experience
- **Adaptive Light/Dark Themes**: Easy toggling with smooth transitions and persistence across sessions
- **Mobile-First Responsive Design**: Optimized experience whether you're on a desktop, tablet, or smartphone
- **Guided Onboarding**: Welcome tour, interactive tutorial, and contextual help for new users
- **Intuitive Interface**: Clean, modern design with subtle animations and meaningful micro-interactions
- **Keyboard Navigation**: Full accessibility support for keyboard-only users

### ���� �� �� 📊 Data & Insights
- **Cross-Device Sync**: Start planning on your laptop, continue on your phone, review on your tablet
- **Export Capabilities**: Download schedules as plain text files for offline reference or printing
- **Privacy-Focused**: You own your data - we only provide secure storage and retrieval
- **Minimal Permissions**: Only collects essential account and productivity information

## ���� �� �� 🛠������️ Technology Stack

StudyPlanner Pro leverages modern web technologies for reliability, performance, and ease of deployment:

- **Frontend**: HTML5 Semantic Markup, CSS3 Custom Properties, Vanilla JavaScript (ES6+)
- **Backend**: Firebase Authentication (Email/Password) & Cloud Firestore Database
- **Styling**: CSS Variables for theming, Flexbox & Grid Layouts, CSS Animations
- **State Management**: LocalStorage for UI preferences, Firestore for user data
- **Build Process**: None - pure static site deployment for maximum compatibility
- **Browser Compatibility**: Chrome, Firefox, Safari, Edge (latest versions)
- **Accessibility**: WCAG 2.1 AA compliant color contrast and keyboard navigation

## ���� �� �� 🚀 Getting Started

Follow these simple steps to set up your personal StudyPlanner Pro instance:

### ���� �������� �� ������ Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A Google account for Firebase console access
- Approximately 10-15 minutes for initial setup
- Basic computer literacy (no coding required!)

### ���� �������� �� ������ Step-by-Step Setup

#### 1. ���� �� Create Your Firebase Project
1. Visit the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** → Enter a name (e.g., "StudyPlanner Pro")
3. �� ⚠��️ **Optional**: Disable Google Analytics for simpler setup
4. Click **"Create project"** and wait for initialization

#### 2. ������� ��🔐 Enable Authentication Services
1. In your Firebase project, navigate to **Build** → **Authentication**
2. Click **"Get started"** → Select the **Sign-in method** tab
3. Click **Email/Password** → Toggle to **Enable** → Click **Save**

#### 3. ������� ��💾 Configure Firestore Database
1. Navigate to **Build** → **Firestore Database**
2. Click **"Create database"** → Select **"Start in test mode"** (ideal for learning)
3. Choose a database location (recommended: `us-central1` for lowest latency)
4. Click **"Enable"** to activate your database

#### 4. ������� ��🔧 Add Firebase Configuration
1. In Firebase console, click the **��⚙��️ Project settings** (gear icon) → **General** tab
2. Scroll to **"Your apps"** section → Click the **</>** icon (Add web app)
3. �� ⚠��️ **Optional**: Enter "StudyPlanner Pro" as app nickname
4. **Important**: Leave "Set up Firebase Hosting" **unchecked**
5. Click **"Register app"**
6. **Copy** the entire Firebase configuration object (it looks like the code block below)
7. Open `script.js` in your preferred text editor (Notepad, VS Code, Sublime Text, etc.)
8. **Replace lines 2-9** with your actual Firebase configuration
9. **Save** the file

```javascript
// Example format (REPLACE WITH YOUR ACTUAL VALUES):
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "1:your-sender-id:web:your-app-id"
};
```

#### 5. ���� �������� �� ������ Test Locally
1. Double-click `auth.html` to open it in your web browser
   - *Or* right-click → "Open with" → select your preferred browser
2. You should see the StudyPlanner Pro sign-in/sign-up interface
3. Click **"Sign Up"** tab → Create a new account with any email and password (6+ characters)
4. After successful registration, you'll be automatically redirected to `app.html`
5. Explore the three main tools: Schedule Generator, Assignment Tracker, and Pomodoro Timer
6. Create a test schedule, add an assignment, and try the timer
7. **Refresh the page** - your data should still be there! (This confirms Firebase persistence)
8. Sign out using the user icon (���👤) in the top-right corner
9. Sign back in with your credentials - your data should reload perfectly

#### 6. ���� �������� �� ������ Deploy for Free (Share with Friends or Publish Online)
Deploy your StudyPlanner Pro instance to share with classmates or make it accessible from anywhere:

##### Option A: �� �� Netlify (Recommended for Beginners)
1. Push your code to a GitHub repository:
   - Create a new repository at [github.com](https://github.com)
   - Upload all StudyPlanner Pro files (or use Git commands)
2. Go to [app.netlify.com](https://app.netlify.com) and sign up with GitHub
3. Click **"New site from Git"** → Connect GitHub → Select your repository
4. Keep all build settings at their defaults → Click **"Deploy site"**
5. �� 🎉 Your site will be live at a customizable Netlify subdomain (e.g., `studyplanner-pro.netlify.app`)

##### Option B: ���� �� GitHub Pages (Great for GitHub Users)
1. Ensure your code is in a GitHub repository
2. Go to your repository → **Settings** → **Pages** tab
3. Under **"Source"**:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Click **"Save"**
5. �� 🎉 Your site will be live at: `https://yourusername.github.io/studyplanner-pro/`

##### Option C: ���� �� Vercel (Alternative Modern Platform)
1. Install Vercel CLI: `npm i -g vercel` (requires Node.js)
2. Run `vercel` in your project directory and follow the prompts
3. OR: Push to GitHub and import via [vercel.com](https://vercel.com) dashboard
4. �� 🎉 Your site will be deployed with automatic HTTPS and global CDN

### ���� �������� �� ������ Verification Checklist
Use this checklist to confirm everything is working correctly:

- [ ] Firebase project successfully created in console
- [ ] Email/Password authentication enabled
- [ ] Firestore database created in test mode
- [ ] Firebase config correctly updated in `script.js`
- [ ] Can sign up new account without errors
- [ ] Can sign in with created credentials
- [ ] Redirects to `app.html` after successful authentication
- [ ] Data persists after page refresh (creations still visible)
- [ ] Theme toggle (���🌙/�☀��️) switches between light/dark modes
- [ ] All three core tools function properly
- [ ] Welcome modal appears on first login
- [ ] Responsive layout works at different screen sizes

### ���� �������� �� ������ Troubleshooting Common Issues
Encountering problems? Try these solutions:

**���🔴 Blank Page or JavaScript Errors**
- Open browser DevTools (F12 or Ctrl+Shift+I) → Console tab
- Look for red error messages and note them
- Most commonly: Firebase config not updated correctly

**���🔴 Authentication Failures**
- Double-check that Email/Password provider is enabled in Firebase Console
- Verify you copied the entire config object correctly
- Ensure you replaced ALL placeholder values with your actual ones

**���🔴 Data Not Persisting**
- Confirm Firestore database was created (not just enabled)
- Check that database is in "test mode" (allows read/write without auth rules)
- Verify internet connection is stable (required for Firebase communication)

**���🔴 Layout Issues on Mobile**
- Test using browser DevTools responsive mode (Ctrl+Shift+M)
- Ensure viewport meta tag is present in HTML head
- Check for fixed-width elements that might overflow small screens

**���🔴 Still Stuck?**
1. Take a screenshot of any error messages
2. Note exactly which step you were on when the issue occurred
3. Refer to the detailed [SETUP_GUIDE.md](SETUP_GUIDE.md) for step-by-step visuals
4. Check [TESTING_INSTRUCTIONS.md](TESTING_INSTRUCTIONS.md) for validation procedures

## ���� �� �� 📖 Comprehensive Usage Guide

### ���� �������� �� ������ Authentication & Account Management

**First-Time Experience:**
1. Upon opening `auth.html`, you'll see a clean split-screen with Sign In/Sign Up tabs
2. The password field includes an eye icon (���👁��️) to toggle visibility for security
3. Form validation provides real-time feedback:
   - Email format validation (@ and . requirements)
   - Password strength indicator (6+ characters minimum)
   - Empty field highlighting

**Account Security:**
- Passwords are hashed using Firebase's industry-standard security
- Sessions persist until manual sign-out or token expiration
- Sign out completely clears client-side session (but keeps data in Firebase)
- Multiple device support: Log in from different devices to access same data

**User Menu (���👤 Header Icon):**
- Displays your email address (partial for privacy)
- Provides clear Sign Out option
- Future: Account settings, data export, subscription management

### ���� �������� �� ������ Study Schedule Generator Deep Dive

**How the Algorithm Works:**
The scheduler uses a weighted distribution algorithm that:
1. Calculates total available study hours: `hours_per_day × days_until_exam`
2. Divides time equally among subjects as a baseline
3. Applies slight randomization to prevent perfectly uniform blocks (feels more natural)
4. Ensures minimum study blocks of 30 minutes per subject per day
5. Formats output in easy-to-read daily breakdowns

**Best Practices:**
- Be realistic about daily available hours (account for meals, travel, other commitments)
- For multiple exams, create separate schedules or use the earliest deadline
- Review and adjust generated schedules based on your personal strengths/weaknesses
- Consider blocking similar subjects apart to reduce mental fatigue
- Use the download feature to save schedules for offline reference

**Advanced Tips:**
- Color-code subjects in your planner/notebook to match schedule blocks
- Schedule breaks between different subjects to maintain focus
- Assign more difficult subjects to your peak energy times (morning for most people)
- Leave buffer time before exams for review and relaxation

### ���� �������� �� ������ Assignment Tracker Mastery

**Prioritization System:**
- **Low (���🟢)**: Minor assignments, practice problems, optional readings
- **Medium (���🟡)**: Regular homework, weekly quizzes, standard projects
- **High (���🔴)**: Major projects, midterms, finals, time-sensitive submissions

**Organization Strategies:**
- View assignments chronologically to see what's due soonest
- Use priority colors to identify critical tasks at a glance
- Regularly review and update due dates as assignments evolve
- Delete assignments immediately after completion to keep list clean
- Consider adding estimated time needed in the assignment name (e.g., "Essay Draft - 2hrs")

**Workflow Integration:**
- Check assignments each morning to plan your day
- Add new assignments immediately when announced in class
- Review upcoming deadlines every Sunday to plan weekly study schedule
- Link related assignments to specific study blocks in your generated schedule

### ���� �������� �� ������ Pomodoro Timer Optimization

**Science Behind the Technique:**
The Pomodoro Technique (developed by Francesco Cirillo) works because:
- 25 minutes is long enough to achieve meaningful focus
- Short enough to prevent mental fatigue and maintain engagement
- Regular breaks prevent burnout and consolidate learning
- The timer creates urgency, reducing procrastination tendencies

**Customization Guidelines:**
- **Short Focus Sessions** (15/5): For when you're tired, distracted, or doing rote memorization
- **Standard Sessions** (25/5): Ideal for most studying, problem-solving, and reading
- **Deep Work Sessions** (45/15 or 50/10): For complex analysis, writing, or project work
- **Experimental**: Try 52/17 (based on Draugiem Group productivity study) or 90/20 (ultradian rhythms)

**Advanced Usage:**
- Pair with subject-specific study: 25min Math problems → 5min break → 25min Physics concepts
- Use breaks effectively: stretch, hydrate, brief walk (avoid social media during breaks)
- Track completed Pomodoros per subject to visualize time investment
- Combine with assignment tracker: Assign Pomodoros to specific tasks
- Listen to focus-enhancing audio during work sessions (instrumental, white noise, etc.)

### ���� �������� �� ������ Theme System & Personalization

**How Theme Toggling Works:**
- Uses CSS Custom Properties (variables) for color definitions
- Adds/removes `dark-mode` class on `<body>` element to switch palettes
- Persists choice in localStorage so preference loads instantly on return
- Smooth transition via CSS `transition` property on all colored elements

**Accessibility Features:**
- Both themes meet WCAG 2.1 AA contrast ratios for text readability
- Focus rings and interactive states clearly visible in both themes
- Motion reduction respects `prefers-reduced-motion` media query
- Touch targets sized appropriately for mobile use (minimum 44x44px)

**Customization Potential:**
- Advanced users can modify CSS variables in `style.css` to create custom themes
- Variables are organized at the top of the file for easy modification
- Color palette includes primary, secondary, background, text, and accent colors
- All interactive states (hover, active, focus) derived from base colors

### ���� �������� �� ������ Onboarding Experience Details

**Welcome Modal:**
- Appears only after first successful login
- Briefly explains the three main tools and their benefits
- Includes clear "Get Started" button to dismiss
- Dismissal tracked via localStorage (`welcomeShown: true`)

**Interactive Tutorial:**
- Accessible via question mark icon in header or appears after welcome
- Guides users through each main feature with highlighted elements
- Includes tooltips explaining purpose and basic usage
- Can be skipped at any time with "Got it!" button
- Completion tracked via localStorage (`tutorialCompleted: true`)

**First Schedule Follow-up:**
- Triggers after user generates their first study schedule
- Offers tips for effective schedule implementation
- Suggests reviewing and adjusting based on personal experience
- Encourages linking schedule to specific assignment work blocks
- Dismissal tracked via localStorage (`firstScheduleShown: true`)

**Benefits of This Approach:**
- Reduces cognitive overload for new users
- Introduces features contextually rather than all at once
- Respects user autonomy - all elements can be dismissed
- Provides just-in-time guidance when most relevant
- Creates positive first experience that encourages continued use

## ���� �� �� 💡 Monetization Strategies

While StudyPlanner Pro remains free for core functionality, here are ethical, user-friendly approaches to sustain development:

### ���� �������� �� ������ Zero-Cost Implementation (Start Today)
- **Affiliate Partnerships**: Recommend genuine productivity tools you believe in (Notion, Todoist, Forest App, etc.) with affiliate links in sidebar or resource page
- **Educational Sponsorships**: Partner with study supply companies, textbook publishers, or online course platforms for sponsored content that provides real value to students
- **Digital Product Creation**: Design and sell premium study templates, exam-specific planners, or productivity e-books via platforms like Gumroad (no upfront cost)
- **Content Monetization**: Create a blog or newsletter with study tips, accepting sponsorships once you build an audience
- **Donation Options**: Add "Buy Me a Coffee" or Ko-fi buttons for users who find exceptional value and wish to support development

### ���� �������� �� ������ Future Freemium Considerations
If developing premium features, maintain these principles:
- **Core Freedom**: Basic schedule generation, assignment tracking, and pomodoro timer remain 100% free forever
- **Value-Added Premium**: Advanced features like AI assistants, detailed analytics, or collaboration tools require subscription
- **Transparent Pricing**: Clear communication about what's free vs. premium
- **Student-Friendly Pricing**: Educational discounts or tiered pricing based on usage
- **Lifetime Access**: Option for one-time payment for permanent premium access (avoids subscription fatigue)

### ���� �������� �� ������ Ethical Guidelines for Monetization
- Never sell user data or compromise privacy for revenue
- Clearly distinguish between organic recommendations and sponsored content
- Ensure any ads are relevant, non-intrusive, and educationally focused
- Provide easy ways to support development without creating paywalls for essential features
- Regularly solicit feedback on monetization approaches from your user base

## ���� �� �� 📄 Licensing

StudyPlanner Pro is released under the permissive MIT License, granting you extensive freedom to use, modify, and distribute the software.

### ���� �������� �� ������ MIT License Summary
**You are permitted to:**
- � ✅ Use StudyPlanner Pro for personal, educational, or commercial purposes
- � ✅ Modify the source code to suit your specific needs
- � ✅ Distribute copies of the original or modified software
- � ✅ Sublicense the software to others
- � ✅ Use portions of the code in other projects

**You must include:**
- �� 📜 The original copyright notice in all copies or substantial portions
- �� 📜 This permission notice in all copies or substantial portions

**You are not held liable for:**
- ���� �� Any warranty - the software is provided "as is"
- ���� �� Any liability for damages arising from use of the software

### ���� �������� �� ������ Full License Text
```
MIT License

Copyright (c) 2026 StudyPlanner Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
```

### ���� �������� �� ������ What This Means For You
- **Students**: Use freely throughout your academic career, modify for personal needs
- **Educators**: Distribute to students, adapt for classroom use, modify for specific curricula
- **Developers**: Fork and improve, create derivatives, use as learning example
- **Institutions**: Deploy campus-wide, customize branding, integrate with existing systems
- **Entrepreneurs**: Build upon as foundation for educational products (with attribution)

## ���� �� �� 🤝 Contributing & Community

While StudyPlanner Pro began as a personal project, we welcome collaboration that aligns with our mission of accessible, effective study tools.

### ���� �������� �� ������ How to Contribute
1. **Fork the Repository**: Create your personal copy on GitHub
2. **Create a Feature Branch**: `git checkout -b feature/your-idea-name`
3. **Make Your Changes**: Follow existing code style and conventions
4. **Write Clear Commits**: Explain what and why (not just how)
5. **Open a Pull Request**: Describe your changes and their benefits
6. **Engage in Discussion**: Respond to feedback constructively

### ���� �������� �� ������ Areas Needing Help
- **Accessibility Auditing**: Ensure WCAG 2.1 AA compliance across all features
- **Internationalization**: Prepare for translation into multiple languages
- **Performance Optimization**: Improve load times and animation smoothness
- **Testing**: Write comprehensive tests for core functionality
- **Documentation**: Create video tutorials, FAQ pages, or instructor guides
- **Feature Ideas**: Suggest thoughtful enhancements that maintain simplicity

### ���� �������� �� ������ Contribution Guidelines
- Keep the core interface simple and intuitive - avoid feature bloat
- Maintain mobile-first responsive design principles
- Preserve the zero-cost deployment philosophy
- Ensure any additions work offline-first with online synchronization
- Respect the permissive MIT licensing philosophy
- Prioritize educational value over engagement metrics
- Make security and privacy paramount in any new features

## ���� �� �� 🙏 Acknowledgments

StudyPlanner Pro stands on the shoulders of many excellent tools and methodologies:

- **Firebase**: For providing accessible, powerful backend infrastructure
- **The Pomodoro Technique**: Francesco Cirillo's time-tested focus methodology
- **Open Source Community**: For countless inspirational projects and learning resources
- **Educational Psychologists**: Researchers who study effective learning strategies
- **Student Communities**: For providing feedback on real-world study challenges
- **Browser Vendors**: For advancing web capabilities that make apps like this possible
- **Accessibility Advocates**: For pushing inclusive design standards forward

## ���� �� �� 📞 Support & Feedback

We're committed to making StudyPlanner Pro the best possible study companion. Your experience matters!

### ���� �������� �� ������ Getting Help
1. **Self-Help Resources**:
   - This README for comprehensive overview
   - [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup walkthroughs
   - [TESTING_INSTRUCTIONS.md](TESTING_INSTRUCTIONS.md) for validation procedures
   - Browser DevTools (F12) for diagnosing issues

2. **Community Support**:
   - Check if similar questions have been asked in issue discussions
   - Search repository discussions for tips and tricks
   - Look for user-created tutorials or videos

3. **Direct Feedback**:
   - While this is a personal project, constructive feedback is always appreciated
   - For specific issues, consider creating a detailed issue report including:
     - Steps to reproduce the problem
     - Expected vs. actual behavior
     - Browser and device information
     - Screenshots or screen recordings when helpful

### ���� �������� �� ������ Feature Requests
We love hearing how StudyPlanner Pro fits into your study routine and what could make it even better! When suggesting features:
- Consider how it maintains the app's simplicity and focus
- Think about accessibility implications for diverse users
- Reflect on whether it serves the core mission of effective studying
- Propose concrete implementation ideas when possible
- Understand that not all suggestions can be implemented, but all are valued

### ���� �������� �� ������ Spreading the Word
If you find StudyPlanner Pro helpful:
- ���� �� Share with classmates, study groups, or friends who could benefit
- ���� �� Leave a positive review if hosted on app stores or directories
- ���� �� Create study-with-me videos featuring the pomodoro timer
- ���� �� Recommend to teachers or academic advisors as a free student resource
- ���� �� Translate the interface to help non-English speaking students (we'll help with setup!)

---

**Ready to transform your study habits? Your focused, productive study sessions are just a few clicks away.**

*StudyPlanner Pro - Because effective studying shouldn't be complicated.*

*Last updated: August 2026 | Version 1.0.0*