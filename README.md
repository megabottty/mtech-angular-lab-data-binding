# Angular Lab — MTech College Teaching Site

An interactive step-by-step Angular tutorial site for beginners, built **in Angular** so students can inspect the source code of the very site they're learning from.

---

## 🚀 Quick Start (Development)

```bash
npm install
npm start
# Open http://localhost:4200
```

---

## 🔧 Firebase Setup (Required Before Deploy)

### Step 1: Create a Firebase Project
1. Go to [firebase.google.com](https://firebase.google.com) → **Add project** → name it (e.g. `mtech-angular-lab`)
2. Disable Google Analytics → **Create project**

### Step 2: Add a Web App
1. Click the **`</>`** Web icon in your project dashboard
2. Register app, copy the `firebaseConfig` object

### Step 3: Enable Authentication
1. Firebase Console → **Authentication** → **Get started**
2. **Sign-in method** → Enable **Google** → set support email → **Save**

### Step 4: Create Firestore Database
1. Firebase Console → **Firestore Database** → **Create database**
2. **Start in test mode** → choose region → **Enable**

### Step 5: Update Environment Files

Edit **both** environment files with your Firebase config:
- `src/environments/environment.ts` (dev)
- `src/environments/environment.prod.ts` (prod)

Replace all `YOUR_*` placeholders with real values from the Firebase console.

### Step 6: Get Your Teacher UID
1. Run `npm start`, go to http://localhost:4200, sign in with Google
2. Firebase Console → **Authentication** → **Users** → copy your **User UID**
3. Paste it as `teacherUid` in both environment files
4. Update Firestore rules to use your UID for teacher access

### Step 7: Update `.firebaserc`
Replace `YOUR_FIREBASE_PROJECT_ID` with your actual project ID.

---

## 🚢 Deploy to Firebase Hosting

```bash
npm run build          # builds to dist/mtech/browser
firebase deploy        # deploys to Firebase Hosting
# Live at: https://YOUR_PROJECT_ID.web.app
```

---

## 📁 Project Structure

```
src/app/
├── core/services/        auth.service.ts, progress.service.ts
├── core/guards/          teacher.guard.ts
├── shared/components/    code-block, collapsible, mental-model-card, lesson-step
├── layout/               shell-layout (sidebar, topbar, progress bar)
└── pages/
    ├── landing/          Home page
    ├── lesson/act1-5/    Day 5 — data binding
    ├── day9/ .. day15/   Later teaching days (acts + student lab per day)
    └── dashboard/        Teacher dashboard

starters/
└── bingeboard-dayN/      Runnable, self-contained BingeBoard project holding the
                          exact end-of-prior-day state (own package.json — npm
                          install && npm start), surfaced via that day's /dayN/start page
```

---

## 👩‍🏫 Teacher Features
- Visit `/dashboard` after signing in with your teacher Google account
- See all students, completed steps, last active time
- Class-wide completion stats

## 👨‍🎓 Student Features
- All lessons are **public** — no login required to read
- Optional Google sign-in saves progress across devices
- 💡 Hint + ✅ Show Answer collapsible panels on every step
- "Mark Complete" button per step (signed-in users only)
