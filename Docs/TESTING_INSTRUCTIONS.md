# �������� ������ ������ ������ ������ ���� ���� ���� ������ ���� ���� ���� ���� �� �� �� Testing Instructions for StudyPlanner Pro

Follow these comprehensive, step-by-step instructions to test StudyPlanner Pro locally and ensure all features work correctly. Whether you're validating your setup or troubleshooting issues, this guide will walk you through systematic testing of every component.

## �������� ������ ������ ������ ������ ���� ���� ���� ������ ���� ���� ���� ���� �� �� �� Local Testing Steps

### 1. �������� ������ ������ ���� ������ ���� ���� �� Open the Authentication Page

- Double-click `auth.html` or open it in your web browser
- You should see the StudyPlanner Pro sign-in/sign-up interface with clean, modern design
- ������ ���� ���� �� ���� �� �� 💡 **Tip**: Use a modern browser (Chrome, Firefox, Safari, or Edge) for best experience

### 2. �������� ������ ������ ���� ������ ���� ���� �� Test Authentication Flow

Verify that user account creation and sign-in work properly:

- Click between **"Sign In"** and **"Sign Up"** tabs to verify they switch smoothly
- Test the password toggle (eye icon �������� ������ ������ ����) in the password field - click to show/hide password
- Try submitting the form with empty fields to see validation messages (Should highlight required fields)
- Try submitting with an invalid email format (e.g., "test" or "test@") - Should show email format error
- Try submitting with a password less than 6 characters - Should show minimum length error
- ������ ���� ���� � ���� �� �� ✅ **Success**: Form prevents submission with errors and shows clear feedback

### 3. �������� ������ ������ ���� ������ ���� ���� �� Test Firebase Connection (Requires Valid Firebase Config)

> ������ ���� ���� �� **Note**: You must have completed the Firebase setup in `script.js` for these steps.

Test the complete authentication cycle with Firebase:

- Create a new account with a test email and password (e.g., `test@example.com` / `SecurePass123!`)
  - Use a strong, unique password for testing
  - Observe password strength feedback as you type
- After successful sign-up, you should be **automatically redirected** to `app.html`
  - URL should change from `.../auth.html` to `.../app.html`
  - Dashboard with three tool cards should be visible
- Sign out using the user menu (����������������) in the header and verify you go back to `auth.html`
  - Click user icon → Select "Sign out" → Should redirect to login page
- Sign in with your test account and verify you go to `app.html`
  - Enter same credentials → Click "Sign In" → Should redirect to dashboard
  - ������ ���� ���� � ���� �� �� ✅ **Success**: Authentication flow works bidirectionally

### 4. �������� ������ ������ ���� ������ ���� ���� �� Test Main Application Features (After Signing In)

#### �������� ������ ������ ���� ������ ���� ���� �� Theme Toggle

- Click the moon/sun icon (����������������/����������������) in the header to switch between light/dark modes
- Verify the change is smooth with CSS transition animation
- Check that the change persists across page refreshes (stored in localStorage)
- Verify both themes are readable and maintain proper contrast
- ������ ���� ���� � ���� �� �� ✅ **Success**: Theme switches instantly and persists

#### �������� ������ ������ ���� ������ ���� ���� �� User Menu

- Click the user icon (����������������) in the top-right header to open the dropdown menu
- Verify the menu displays your email (partially masked for privacy) and "Sign out" option
- Click "Sign out" and verify it returns you to `auth.html`
- Test clicking outside the menu to close it
- ������ ���� ���� � ���� �� �� ✅ **Success**: Menu opens/closes correctly and sign out works

#### �������� ������ ������ ���� ������ ���� ���� �� Study Schedule Generator

Test the schedule creation workflow:

1. Enter subjects as comma-separated values (e.g., `"Mathematics, Physics, Chemistry, History"`)
   - Try with no spaces: `"Math,Science,English"`
   - Try with spaces: `"Math, Science, English"`
   - Try single subject: `"Biology"`
2. Set hours per day using the number input (e.g., `3`)
   - Try minimum value (`1`)
   - Try realistic value (`4`)
   - Try maximum reasonable value (`8`)
3. Set days until exam using the number input (e.g., `7`)
   - Try short-term (`1` day)
   - Try mid-term (`7` days)
   - Try long-term (`30` days)
4. Click **"Generate Schedule"** button
   - Verify schedule appears in the output area below
   - Check that subjects are distributed across days
   - Verify total hours match (`hours_per_day × days`)
5. Click **"Download as Text"** to download the schedule
   - Check your downloads folder for the `.txt` file
   - Open the file to verify it matches the on-screen schedule
6. ������ ���� ���� � ���� �� �� ✅ **Success**: Schedule generates correctly and is downloadable

#### �������� ������ ������ ���� ������ ���� ���� �� Assignment Tracker

Test assignment creation, viewing, and deletion:

1. Enter assignment name (e.g., `"Complete Calculus Problem Set"`)
   - Try short name: `"Essay"`
   - Try descriptive name: `"Research Paper Draft - 1500 words"`
   - Try with special characters: `"Lab #3: Titration (Chemistry)"`
2. Select a due date using the date picker
   - Try today's date
   - Try tomorrow's date
   - Try next week's date
   - Try past date (should still allow - user responsibility)
3. Choose priority level (Low/Medium/High)
   - Low: ��������� ����🟢 (minor tasks, practice)
   - Medium: ��������� ����🟡 (regular homework, quizzes)
   - High: ��������� ����🔴 (major projects, exams, deadlines)
4. Click **"Add Assignment"**
   - Verify the assignment appears in the list below the form
   - Check that it shows correct name, date, and priority color
   - Verify assignments sort chronologically (earliest first)
5. Test the delete button (����������������) on assignments
   - Click trash icon on an assignment
   - Verify it disappears immediately from the list
   - Confirm deletion is permanent (use data persistence test below)
6. Try adding multiple assignments with different priorities and due dates
   - Verify visual prioritization with color coding
   - Verify chronological ordering regardless of input order
7. ������ ���� ���� � ���� �� �� ✅ **Success**: Assignments add, display correctly, and delete properly

#### �������� ������ ������ ���� ������ ���� ���� �� Pomodoro Timer

Test all timer functionality and state transitions:

1. Set work and break minutes using the inputs (defaults: 25/5)
   - Try default values: Work=25, Break=5
   - Try short focus: Work=15, Break=3
   - Try deep work: Work=45, Break=10
   - Try experimental: Work=52, Break=17 (based on productivity study)
2. Click **"Start"** to begin the timer
   - Verify the timer starts counting down from work time
   - Check that Start button changes to Pause
   - Verify timer display updates every second
3. Verify the timer starts counting down immediately
   - Watch the minutes and seconds decrease
   - Confirm it shows MM:SS format (e.g., 24:59, 24:58...)
4. Click **"Pause"** to temporarily stop the timer
   - Verify timer stops changing
   - Check that Pause button changes to Resume
   - Note the current time remains displayed
5. Click **"Resume"** to continue
   - Verify timer resumes counting down from where it left off
   - Check that Resume button changes back to Pause
6. Click **"Reset"** to reset to initial values
   - Verify timer returns to originally set work time
   - Check that button shows "Start" again
   - Confirm any paused/resumed state is cleared
7. Let the timer complete a full work cycle to verify automatic break transition
   - Start timer and let it reach 00:00
   - Verify it automatically switches to break time
   - Check that timer display shows break duration (e.g., 05:00)
   - Verify visual indication of break mode (if implemented)
8. Let break timer complete to verify automatic return to work
   - Start from step 7 or manually set timer to break completion
   - When break reaches 00:00, verify it switches back to work time
   - Check that it resumes with originally set work duration
9. Test edge cases:
   - Pause at exactly 00:01 then resume
   - Reset during active timer
   - Rapid start/pause/start cycles
10. ������ ���� ���� � ���� �� �� ✅ **Success**: Timer accurately tracks time, transitions between work/break, and responds correctly to all controls

#### �������� ������ ������ ���� ������ ���� ���� �� Onboarding Experience (First Login Only)

Test the new user guidance system:

- **Welcome modal**: Should appear after first successful login
  - Verify it contains brief overview of the three main tools
  - Check for clear "Get Started" button to dismiss
  - Click button and verify modal disappears
- **Tutorial walkthrough**: Should appear after closing welcome modal (or accessible via help icon)
  - Verify it highlights each main feature with explanatory tooltips
  - Test navigation: "Next", "Back", "Skip" buttons
  - Verify you can complete the full tutorial or skip at any time
  - Check that completion is remembered
- **First schedule follow-up**: Should appear after generating your first schedule
  - Verify it offers tips for effective schedule implementation
  - Check for actionable suggestions (review schedule, link to assignments)
  - Verify dismissibility
- All onboarding steps should be dismissible and not reappear after dismissal
  - Test by refreshing page - welcome/tutorial should not reappear
  - Test by signing out and back in with same account - should not reappear
  - Test that first schedule follow won't reappear for same account
- ������ ���� ���� � ���� �� �� ✅ **Success**: Onboarding guides new users without being intrusive

### 5. �������� ������ ������ ���� ������ ���� ���� �� Test Responsiveness

Ensure the application works well on all device sizes:

- Resize your browser window to see how the layout adapts
  - Desktop width (>1024px): Three cards should appear in row
  - Tablet width (768-1024px): Layout should adapt (likely 2+1 or stacked)
  - Mobile width (<768px): Cards should stack vertically
- Test on mobile view using browser dev tools (Ctrl+Shift+I or Cmd+Opt+I)
  - Use device toolbar to simulate iPhone, Android, iPad, etc.
  - Verify all buttons are easily tappable (minimum 44x44px touch targets)
  - Check that text remains readable without zooming
  - Verify input fields are usable on touch screens
- ������ ���� ���� � ���� �� �� ✅ **Success**: Layout adapts gracefully and remains usable at all screen sizes

### 6. �������� ������ ������ ���� ������ ���� ���� �� Test Data Persistence

Verify that Firebase is correctly saving and retrieving your data:

- While logged in, create test data in each section:
  - Schedule Generator: Create a schedule with specific subjects/hours/days
  - Assignment Tracker: Add 2-3 assignments with different names, dates, priorities
  - Pomodoro Timer: Set custom work/break times (e.g., 30/10)
- Refresh the page (F5 or Ctrl+R)
  - ������ ���� ���� �� ���� �� �� ⏳ **Wait for reload** - you may briefly see loading state
  - Verify your created schedule is still visible in output area
  - Verify your assignments are still in the list with correct details
  - Verify timer settings show your custom values (not defaults)
  - Verify you remain logged in (no redirect to auth.html)
- Sign out and sign back in with a **different** test account
  - Verify the new account sees a clean slate (no data from first account)
  - This confirms proper data isolation between users
- Sign back out and in with your **original** test account
  - Verify your original data reappears exactly as left
  - ������ ���� ���� � ���� �� �� ✅ **Success**: Data persists correctly and is isolated by user account

### 7. �������� ������ ������ ���� ������ ���� ���� �� Advanced Functionality Tests

Test additional features and edge cases:

- **Error Handling**:
  - Try generating schedule with empty subjects field
  - Try adding assignment with empty name field
  - Verify appropriate validation messages appear
- **Data Integrity**:
  - Generate schedule, then modify inputs and regenerate - verify new schedule replaces old
  - Add assignment, then immediately delete it - verify list empties
  - Set timer to 1 minute work/10 second break, start, and let it cycle 2-3 times
- **Performance**:
  - Test with maximum reasonable inputs (e.g., 10 subjects, 8 hours/day, 30 days)
  - Verify application remains responsive (no freezing or lag)
- ������ ���� ���� � ���� �� �� ✅ **Success**: Application handles edge cases gracefully

## �������� ������ ������ ������ ������ ���� ���� ���� ������ ���� ���� ���� ���� �� �� �� What to Verify

Use this detailed checklist to confirm every aspect of StudyPlanner Pro works correctly:

### �������� ������ ������ ���� ������ ���� ���� �� Authentication Page (`auth.html`)

- [ ] Clean, modern design loads correctly without console errors
- [ ] Switching between sign in and sign up tabs works smoothly with animation
- [ ] Password toggle (eye icon �������� ������ ������ ����) functions properly in both fields
- [ ] Form submission does NOT refresh the page (indicating JavaScript interception)
- [ ] Validation messages appear for invalid inputs:
    - Empty email/password fields
    - Invalid email format (missing @, missing domain, etc.)
    - Password less than 6 characters
    - Password mismatch (if confirmation field exists)
- [ ] After successful login/sign up, it redirects to `app.html` within 2 seconds
- [ ] Sign out functionality works and returns to `auth.html` with clean state
- [ ] "Remember me" or persistent login options work as expected (if implemented)
- [ ] HTTPS connection to Firebase is established (check lock icon in browser)

### �������� ������ ������ ���� ������ ���� ���� �� Application Page (`app.html`)

- [ ] Header displays correctly with:
    - Theme toggle button (����������������/����������������) on left
    - Application title centered
    - User menu (����������������) on right with email and sign out
- [ ] Theme toggle switches between light/dark modes with smooth animation (<300ms)
- [ ] User menu dropdown opens/closes correctly with smooth animation
- [ ] User menu shows sign out option and optionally account info
- [ ] Welcome modal appears on first login per account (then gets suppressed via localStorage)
- [ ] All three tool cards display correctly in responsive grid layout:
    - Equal spacing and sizing
    - Consistent card styling with shadows/borders
    - Proper wrapping on smaller screens
- [ ] Schedule generator, assignment tracker, and pomodoro timer all function properly:
    - All input controls respond to interaction
    - All buttons provide visual feedback on click
    - All outputs update correctly based on inputs
- [ ] Data persists between page refreshes when logged in (verifying Firebase integration)
    - Schedule output remains after refresh
    - Assignment list remains after refresh
    - Timer settings remain after refresh
    - Authentication state remains after refresh
- [ ] Welcome message system works correctly:
    - Appears exactly once per user account
    - Can be dismissed and does not reappear for same account
    - Reappears only for new/different accounts
    - Dismissal state stored in localStorage
- [ ] Tutorial walkthrough can be:
    - Completed fully with "Next" → "Finish" progression
    - Skipped at any point with "Skip" button
    - Revisited via help/icon if available
    - Navigation works correctly (Next/Back buttons)
- [ ] First schedule follow-up appears after creating first schedule per account
    - Contains helpful tips for schedule implementation
    - Is dismissible and does not reappear for same account
    - Does not appear for accounts that haven't generated a schedule
- [ ] Assignments can be deleted and removed permanently from Firestore
    - Delete button removes item from UI immediately
    - Item does not return after page refresh
    - Multiple assignments can be deleted independently
- [ ] Timer preserves state when paused and resumed correctly:
    - Paused time remains exactly the same when resumed
    - Multiple pause/resume cycles work correctly
    - Reset clears all state and returns to initial values
- [ ] No JavaScript errors appear in browser console during normal operation
- [ ] Network requests to Firebase show as successful in dev tools Network tab
- [ ] Page loads within reasonable time (<3 seconds on average connection)

### �������� ������ ������ ���� ������ ���� ���� �� Deployment Testing (If Deployed to Netlify, GitHub Pages, etc.)

Follow these steps to verify your deployed version works identically to local:

1. ������ ������ ������ ���� ���� ���� Push your code to a Git repository (GitHub, GitLab, etc.)
2. ������ ������ ������ ���� ���� ���� Connect the repository to your chosen hosting service:
    - Netlify: Connect via GitHub/GitLab/Bitbucket
    - GitHub Pages: Enable in repository Settings → Pages
    - Vercel: Import GitHub repository
    - Other: Follow provider's static site deployment instructions
3. ������ ������ ������ ���� ���� ���� Ensure Firebase is properly configured in your deployed version:
    - Deployed `script.js` must contain SAME Firebase config as your working local version
    - ������ ���� ���� �� ���� �� �� 💡 **Tip**: If using environment variables, ensure they're set correctly in hosting platform
4. ������ ������ ������ ���� ���� ���� Test the live site following ALL the steps above:
    - Use the live URL (not localhost) in a private/incognito browser window
    - Perform complete authentication flow with new test account
    - Test all three main features with sample data
    - Verify data persistence across refreshes and sessions
    - Test responsiveness using browser dev tools device mode
5. ������ ������ ������ ���� ���� ���� Verify that the deployed version behaves identically to the local version:
    - Same visual appearance and layout
    - Same interaction patterns and feedback
    - Same performance characteristics
    - Same data persistence behavior
6. ������ ������ ������ ������ ���� ���� � ���� ���� ���� ���� �� �� ✅ **Success**: Deployment is faithful to local development version

## �������� ������ ������ ������ ������ ���� ���� ���� ������ ���� ���� ���� ���� �� �� �� Troubleshooting Guide

Use this systematic approach to diagnose and resolve common issues:

### �������� ������ ������ ���� ������ ���� ���� �� Step-by-Step Diagnostic Process

When something isn't working, follow this procedure:

1. ������ ������ ������ ���� ���� ���� ���� ���� �� �� **Reproduce the Issue Consistently**
    - Write down exact steps to see the problem
    - Note what you expected vs. what actually happened
    - Try to reproduce 2-3 times to confirm it's not a fluke

2. ������ ������ ������ ���� ���� ���� ���� ���� �� �� **Check Browser Console FIRST (Most Important!)**
    - Press F12 or Ctrl+Shift+I to open Developer Tools
    - Go to Console tab
    - Look for RED error messages - these are critical clues
    - Note: Error message, file name, line number, and timestamp
    - JavaScript errors often break functionality silently

3. ������ ������ ������ ���� ���� ���� ���� ���� �� �� **Isolate the Problem Scope**
    - Does the issue occur:
        - Locally only? → Likely environment/setup issue
        - Deployed only? → Likely deployment/hosting/config issue
        - Both locations? → Likely code/logic issue
    - Does it affect:
        - All users/accounts? → System-wide issue
        - Specific accounts? → Account-specific or data issue
        - Specific actions? → Feature-specific issue

4. ������ ������ ������ ���� ���� ���� ���� ���� �� �� **Verify One Variable at a Time**
    - Change ONE thing, test, then revert if it doesn't help
    - Keep careful notes of what you tried and results
    - Common variables to test:
        - Browser (try Chrome/Firefox/Safari/Edge)
        - Internet connection (try different network)
        - Firebase config values
        - Browser extensions/extensions (disable temporarily)
        - Incognito/private browsing (to isolate extensions/cache)
        - Time of day (to rule out temporary service issues)

5. ������ ������ ������ ���� ���� ���� ���� ���� �� �� **Don't Hesitate to Start Over When Needed**
    - Firebase projects are free and quick to recreate
    - Sometimes creating a fresh project and copying working config is faster than debugging
    - Keep backups of working configurations

### �������� ������ ������ ���� ������ ���� ���� �� Common Issues & Solutions

#### �������� ������ ������ ���� ������ ���� ���� �� "Authentication failed" or "Sign-in unsuccessful"

**Symptoms**:
- Sign up/sign in buttons show error messages or do nothing
- Redirect loop between auth.html and app.html
- "Invalid email/password" messages despite correct credentials
- Network errors in console related to Firebase auth

**Likely Causes**:
- Incorrect Firebase config values in script.js
- Email/Password provider not enabled in Firebase Console
- No internet connection or firewall blocking Firebase
- Corrupted browser cache or extensions interfering

**Solutions**:
1. ������ ������ ������ ���� ���� ���� Double-check your Firebase config values in `script.js`:
    - Open script.js and verify lines 2-9 match EXACTLY what Firebase console shows
    - Pay special attention to: apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId
    - Verify no extra spaces, missing quotes, or typos
    - Confirm all 6 fields have values (none are empty or placeholder text)

2. ������ ������ ������ ���� ���� ���� Ensure Email/Password provider is enabled:
    - Go to Firebase Console → Your Project → Authentication → Sign-in method tab
    - Find "Email/Password" in the list
    - Verify toggle is switched to ENABLED (should be blue/active)
    - If disabled, click it, toggle to enable, and click SAVE

3. ������ ������ ������ ���� ���� ���� Verify internet connectivity:
    - Try loading other websites (google.com, github.com) to confirm general connectivity
    - Try accessing Firebase directly: https://firebase.google.com/
    - If on corporate/school network, check if they block Firebase domains (*.firebaseio.com, *.googleapis.com)
    - Try from different network (mobile hotspot, home network) to isolate

4. ������ ������ ������ ���� ���� ���� Clear browser cache and disable extensions:
    - Open incognito/private browsing window (Ctrl+Shift+N / Cmd+Shift+N)
    - Test in this clean environment to rule out extensions/cache issues
    - If works in incognito, systematically disable extensions to find culprit
    - Common offenders: ad blockers, privacy scripts, SSL inspectors

5. ������ ������ ������ ���� ���� ���� Check console for specific Firebase auth errors:
    - `auth/invalid-api-key` → Your apiKey value is incorrect
    - `auth/auth-domain-configuration-mismatch` → Your authDomain doesn't match project
    - `auth/missing-app-credential` → Firebase config object is incomplete
    - `auth/network-request-failed` → No internet or blocked connection
    - `auth/too-many-requests` → Rate limited (wait a moment and try again)

#### �������� ������ ������ ���� ������ ���� ���� �� "Data not saving" or "Nothing appears after refresh"

**Symptoms**:
- Created schedules/assignments/timer settings disappear after page refresh
- Console shows Firestore permission errors or network issues
- Data appears temporarily but vanishes on reload
- No errors but data doesn't persist

**Likely Causes**:
- Firestore database not initialized or in wrong mode
- Security rules blocking read/write access
- Incorrect projectId in Firebase config
- No authenticated user context when attempting to write
- Extensive network latency or timeout

**Solutions**:
1. ������ ������ ���� ���� ���� ���� Confirm Firestore database is created and in **test mode**:
    - Go to Firebase Console → Firestore Database
    - Verify you see "Database created" status
    - Check that it indicates "Data mode: Test mode" (not "Locked mode")
    - If in Locked mode for testing, click to switch to Test mode (temporary for learning)
    - �� ⚠��️ **Warning**: Test mode allows unrestricted read/write - only use for learning/testing!

2. ������ ������ ������ ���� ���� ���� Check browser console (F12 → Console) for Firebase errors:
    - Look for red messages containing "firestore" or "permission"
    - Common errors:
        - `PERMISSION_DENIED`: Missing or incorrect security rules
        - `UNAVAILABLE`: Network connectivity issues
        - `RESOURCE_EXHAUSTED`: Exceeded quota (unlikely for testing)
        - `NOT_FOUND`: Database not found or incorrect projectId
    - Note the exact error message and timestamp

3. ������ ������ ������ ���� ���� ���� Verify your Firebase config includes correct `projectId`:
    - In script.js, verify `projectId: "YOUR_PROJECT_ID"` matches exactly what's shown in:
        - Firebase Console → Project Settings → General → Your project → Project ID
        - Firebase Console → Firestore Database → Project ID shown in URL or title
    - Project ID is case-sensitive and must match exactly

4. ������ ������ ������ ���� ���� ���� Ensure you're logged in (data only saves for authenticated users):
    - Verify you see your email in the user menu (����������������) header
    - Try signing out and back in to refresh authentication state
    - Check localStorage for Firebase session token (Application tab in dev tools)
    - Data writes will fail silently if no auth context

5. ������ ������ ������ ���� ���� ���� Test with minimal configuration to isolate:
    - Temporarily simplify your test (just try to save/retrieve one value)
    - Use Firebase console's data viewer to see if writes are arriving
    - Check Firestore Usage tab to see if read/write operations are registering

#### �������� ������ ������ ���� ������ ���� ���� �� Page shows blank or missing content

**Symptoms**:
- Completely blank white page
- Missing header, cards, or footer
- Only background color or partial styling visible
- Browser tab shows "Loading..." indefinitely

**Likely Causes**:
- JavaScript errors preventing execution of subsequent code
- Missing or incorrectly linked files (CSS, JS)
- Content blocking extensions or network issues
- Syntax errors in HTML/CSS/JS files

**Solutions**:
1. ������ ������ ������ ���� ���� ���� Open browser console (F12 → Console tab):
    - This is the #1 place to look for blank page issues
    - Look for RED error messages - they will usually point directly to the problem
    - Common JavaScript errors:
        - `Uncaught ReferenceError: firebase is not defined` → Firebase SDK not loaded
        - `Uncaught TypeError: Cannot read property '..." of undefined` → Variable not initialized
        - `Uncaught SyntaxError: Unexpected token` → Typo or missing bracket/quote
        - `Failed to load resource: net::ERR_FILE_NOT_FOUND` → Missing file (check paths/names)
    - Note: First error often causes cascade of subsequent errors

2. ������ ������ ��� ���� ���� �█�� Verify all required files are loaded:
    - In dev tools, go to Network tab
    - Reload the page (F5) while monitoring
    - Check for these essential files with status 200 (OK):
        - auth.html or app.html (main HTML)
        - script.js (JavaScript logic)
        - style.css (styling)
        - Firebase SDK scripts (should load from www.gstatic.com/firebasejs/...)
    - Any file showing 404 (Not Found) or other error status indicates loading problem

3. ������ ������ ��� ���� ���� �█�� Check for content blocking extensions:
    - Temporarily disable ad blockers, privacy extensions, or security software
    - Some extensions mistakenly block Firebase CDN URLs (www.gstatic.com, firebase.google.com)
    - Try in incognito mode with extensions disabled to test

4. ������ ������ ��� ���� ���� �█�� Validate HTML structure:
    - View page source (right-click → View Page Source or Ctrl+U)
    - Verify essential elements exist:
        - `<div id="root">` or similar container for app content
        - Required IDs/classes referenced in JavaScript
        - Properly closed tags (missing `</div>` can break layout)
    - Look for obvious corruption or truncation in the source

5. ������ ��� ���� �█�� Try a hard refresh to bypass cache:
    - Windows/Linux: Ctrl+F5 or Ctrl+Shift+R
    - Mac: Cmd+Shift+R
    - This forces browser to reload all files from server, not cache

#### �������� ������ ��� ������ ���� �█� ����� �� Layout looks broken on mobile/resize

**Symptoms**:
- Elements overlapping or misaligned
- Text overflowing containers or being cut off
- Horizontal scrollbar appearing unexpectedly
- Buttons or inputs too small to tap/click on touch screens
- Layout doesn't change when window is resized

**Likely Causes**:
- CSS not loading or being overridden
- Missing viewport meta tag for mobile responsiveness
- Fixed-width elements that don't adapt to small screens
- CSS specificity issues causing unexpected styling
- Images or content with fixed dimensions breaking grid/flex layout

**Solutions**:
1. ������ ������ ��� ���� ���� �█�� Verify `style.css` is properly linked in HTML files:
    - Check `<head>` section of both auth.html and app.html
    - Look for: `<link rel="stylesheet" href="style.css">`
    - Verify file name is exactly correct (case-sensitive on some systems)
    - Check Network tab in dev tools to确认 it loads with status 200

2. ������ ������ ��� ���� ���� �█�� Check console for CSS loading errors:
    - Network tab will show failed CSS loads as red entries
    - Look for 404 errors or MIME type mismatches
    - If CSS fails to load, JavaScript that depends on it may also fail

3. ������ ������ ��� ���� ���� �█�� Ensure viewport meta tag is present in HTML head:
    - Should be: `<meta name="viewport" content="width=device-width, initial-scale=1">`
    - This tells mobile browsers to use device width for rendering
    - Without this, mobile browsers use virtual width (~980px) and zoom out
    - Verify it's present in BOTH auth.html and app.html

4. ������ ������ ��� ���� ���� �█�� Test at specific breakpoint widths:
    - Mobile: < 480px (phones in portrait)
    - Mobile landscape: < 768px (phones in landscape, small tablets)
    - Tablet: 768px - 1024px (typical tablet range)
    - Desktop: > 1024px (small laptops and up)
    - Use browser dev tools device toolbar to test exact widths

5. ������ ������ ��� ���� ���� �█�� Identify problematic elements:
    - In dev tools, select elements that look wrong
    - Check their computed width, height, padding, margin
    - Look for fixed widths (e.g., `width: 500px;`) that don't adapt
    - Check for `overflow: visible` vs `hidden` or `scroll`
    - Examine inherited styles from parent elements

6. ������ ��� ���� �█�� Test touch target sizes:
    - Buttons, icons, and interactive elements should be minimum 44x44px
    - Check in dev tools: select element → look at computed dimensions
    - Increase padding or font size if touch targets are too small
    - Ensure adequate spacing between touch targets to prevent误 taps

#### �������� ������ ��� ������ ���� �█� ����� �� Timer not switching between work/break

**Symptoms**:
- Timer reaches 00:00 but doesn't automatically switch modes
- Timer stops at 00:00 instead of continuing
- Manual mode switch works but automatic doesn't
- Timer shows negative numbers after completion

**Likely Causes**:
- JavaScript logic error in timer state management
- Missing or incorrect event listener for timer completion
- Incorrect comparison (using === vs == or wrong units)
- Edge case handling missing (exactly 0 seconds)
- Pause state interfering with completion detection

**Solutions**:
1. ������ ������ ��� ���� ���� �█�� Check console for errors when timer completes:
    - Start timer and let it run to completion
    - Watch Console tab for any red messages that appear at 00:00
    - Common errors:
        - `Cannot read property '...' of null` → Trying to access non-existent element
        - `is not a function` → Trying to call something that isn't a function
        - `undefined is not a function` → Similar to above
        - Logic errors that don't throw exceptions but break flow

2. ������ ������ ��� ���� ���� �█�� Verify you haven't paused the timer at exactly 0 seconds:
    - This is an edge case that can break state detection
    - Try pausing at 00:01 or 00:02 instead of exactly 00:00
    - If it works when not paused at 0, look for edge case handling in code

3. ������ ������ ��� ���� ���� �█�� Try refreshing and testing again from clean state:
    - Sometimes intermediate state can cause issues
    - Click Reset, then Start fresh and let it complete naturally
    - Avoid manual intervention during the test cycle

4. ������ ��� ���� �█�� Inspect timer logic in script.js:
    - Look for the countdown interval function (usually setInterval)
    - Find the condition that checks for time <= 0
    - Verify it correctly triggers mode switch and resets time
    - Check that it handles both work→break and break→work transitions
    - Verify it clears and resets interval when switching modes

5. ������ ��� ���� �█�� Test with different durations to isolate:
    - Try very short durations (5 second work, 2 second break) to test quickly
    - Try longer durations to ensure it's not a timing issue
    - Verify behavior is consistent regardless of duration values

#### �������� ������ ��� ������ ���� �█� ����� �� Welcome/tutorial not appearing

**Symptoms**:
- No welcome modal after first login
- No tutorial walkthrough accessible
- Onboarding elements missing entirely
- User feels lost or unsure how to use features

**Likely Causes**:
- localStorage already has completion flags set from previous testing
- Code logic error in checking/displaying onboarding
- Missing or incorrect localStorage keys
- Session or state management issue

**Solutions**:
1. ������ ������ ��� ���� ���� �█�� Clear localStorage for the domain:
    - Open dev tools (F12) → Application tab
    - In left sidebar, under Storage → Local Storage
    - Click your website's origin (e.g., http://localhost or your domain)
    - Click "Clear" button to remove all localStorage for this site
    - Alternatively, remove specific keys: `welcomeShown`, `tutorialCompleted`, `firstScheduleShown`

2. ������ ������ ��� ���� ���� �█�� Or test with an incognito/private browsing window:
    - Incognito mode starts with clean localStorage and cookies
    - Perfect for testing first-time user experience
    - Close and reopen incognito window to reset completely

3. ������ ��� ���� �█�� Sign out and back in to reset onboarding state for fresh test:
    - While logged in, sign out via user menu
    - Sign back in with same credentials
    - Welcome/tutorial should appear if localStorage was cleared
    - If still not appearing, issue is in display logic, not just storage

4. ������ ��� ���� �█�� Check for onboarding elements in page source:
    - View page source (Ctrl+U) after login
    - Search for welcome modal HTML (look for "welcome", "modal", "onboarding")
    - Search for tutorial hints or highlight elements
    - If elements missing entirely, issue is in rendering/logic
    - If elements present but hidden, issue is in CSS/display logic

5. ������ ��� ���� �█�� Verify localStorage is being set correctly:
    - In dev tools Application tab → Local Storage
    - Look for keys like: `welcomeShown`, `tutorialCompleted`, `firstScheduleShown`
    - After triggering each onboarding step, verify corresponding key is set to `true`
    - If keys not being set, issue is in JavaScript logic that should store them
    - If keys are set but onboarding still shows, issue is in read/check logic

6. ������ ��� ���� �█�� Test timer completion triggering follow-up:
    - Generate a schedule (should trigger first schedule follow-up)
    - Check if follow-up appears after generation
    - If not, verify the schedule generation code calls the follow-up display function
    - Check localStorage for `firstScheduleShown` being set after generation

### �������� ������ ��� ������ ���� �█� ����� �� Getting Help

If you've worked through the troubleshooting steps above and are still stuck:

1. ������ ������ ��� ���� ���� �█�� Gather comprehensive information:
    - Screenshots of any error messages or unusual behavior
    - Exact steps you were on when issue occurred (numbered list)
    - What you expected to happen vs. what actually happened
    - Browser name and version (Chrome 115.0.5790.170, Firefox 118.0.2, etc.)
    - Whether issue occurs locally, deployed, or both
    - Any recent changes you made before the issue appeared
    - Contents of browser console (F12 → Console) - copy/paste text of errors
    - Network tab shows (if relevant to loading/Firebase issues)

2. ������ ������ ��� ���� ���� �█�� Check official resources:
    - [Firebase Documentation](https://firebase.google.com/docs) - auth/firestore guides
    - [Netlify Support](https://answers.netlify.com/) - deployment-specific help
    - [GitHub Pages Documentation](https://docs.github.com/en/pages) - GitHub Pages help
    - Browser-specific support (Chrome/Firefox/Safari/Edge help centers)
    - [MDN Web Docs](https://developer.mozilla.org/) - web technology reference

3. ������ ������ ��� ���� ���� �█�� Ask specific, answerable questions:
    - Instead of: "It's not working" �� ❌
    - Try: "When I click Sign Up, I get '[specific error message]' in console at line 42 of script.js" � ✅
    - Or: "Data appears after creating assignment but disappears after page refresh - console shows 'Permission denied' for firestore.googleapis.com" � ✅
    - Or: "Timer reaches 00:00 but stays there instead of switching to break - no errors in console" � ✅

4. ������ ��� ���� �█�� Reach out for assistance:
    - While this is a personal project, I'm happy to help you get StudyPlanner Pro working perfectly!
    - Provide the information above for fastest resolution
    - Remember: every developer encounters these issues - solving them is how we learn!

## �������� ������ ��� ������ ���� �█� ������ ������ ���� ���� ����� ���� ���� �� �� �� Quick Verification Checklist

After completing your tests, use this checklist to confirm everything works:

- [ ] �������� ������ ������ ������ ���� ���� Authentication works (sign up, sign in, sign out with Firebase)
- [ ] ������ ������ ������ ���� ���� ���� Firebase connection is successful (no auth/database errors in console)
- [ ] ������ ������ ������ ���� ���� ���� All three main features function correctly:
    - Schedule Generator: Creates and downloads personalized schedules
    - Assignment Tracker: Adds, displays, deletes assignments with priorities
    - Pomodoro Timer: Accurately tracks time, transitions work/break, responds to controls
- [ ] ������ ������ ��� ���� ���� �█�� Data persists across page refreshes and sessions (Firebase verified)
- [ ] ������ ������ ��� ���� ���� �█�� Theme toggle works and preference is saved in localStorage
- [ ] ������ ������ ��� ���� ���� �█�� Responsive layout adapts to different screen sizes (mobile/tablet/desktop)
- [ ] ������ ������ ��� ���� ���� �█�� Onboarding flows appear/dismiss as expected (welcome, tutorial, follow-up)
- [ ] ������ ������ ������ ���� ���� ���� No JavaScript errors in the browser console during normal operation
- [ ] ������ ��� ���� �█� �� ✅ **All checks passed**: Your StudyPlanner Pro is ready to use! ����������� ������📚����������������������������

Remember: Testing is an iterative process. If you make changes or updates to the code, run through these tests again to ensure you haven't inadvertently broken existing functionality. Happy testing and happy studying! �������� ������ ������ ������ ���� ���� �������� ������ ���� ���� ���� �� �� ������