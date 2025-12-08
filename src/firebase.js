// Minimal Firebase initialization for Google sign-in.
// This file is resilient to missing env vars so the app doesn't throw
// when Firebase is not configured. If you want Google sign-in, set
// the Vite env vars (see README below) and restart the dev server.
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

let app = null;
let auth = null;
let googleProvider = null;
let firebaseAvailable = false;

if (apiKey && authDomain && projectId && appId) {
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    appId,
  };

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  firebaseAvailable = true;
} else {
  // Not configured — avoid calling Firebase APIs which throw hard errors
  // when provided keys are missing. The app will still work without
  // Google sign-in; LoginForm will hide that option.
  // Helpful for development without Firebase credentials.
}

export { app, auth, googleProvider, firebaseAvailable };

export default app;
