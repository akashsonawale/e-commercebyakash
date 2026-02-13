// Optional Firebase integration.
// To enable: replace the placeholders below with your Firebase project config.
// Then run `npm install` to ensure `firebase` is available.

let firebaseAuth = null;

try {
  // Lazy import so app still works without firebase installed/configured
  const { initializeApp } = require('firebase/app');
  const { getAuth } = require('firebase/auth');

  // TODO: replace with your Firebase config
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || ""
  };

  const shouldInit = firebaseConfig && firebaseConfig.apiKey;
  if (shouldInit) {
    const app = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(app);
  }
} catch (e) {
  // firebase not installed or failed to init — we'll fallback to local mock
  firebaseAuth = null;
}

module.exports = { firebaseAuth };
