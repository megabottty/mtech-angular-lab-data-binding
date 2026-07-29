// Copy this file to environment.ts and fill in your Firebase config values.
// Get these from: Firebase Console → Project Settings → Your Apps → Web App
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  },
  // Your Google UID — sign in first, then check Firebase Auth → Users
  teacherUid: 'YOUR_TEACHER_GOOGLE_UID'
};
