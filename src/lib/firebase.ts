import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase securely to avoid re-initialization error
// Also verify we have values to prevent Next.js build errors (auth/invalid-api-key)
const app = firebaseConfig.apiKey
    ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
    : undefined;

// Only export auth & db if app was successfully initialized
export const auth = app ? getAuth(app) : null as any;
export const db = app ? getFirestore(app) : null as any;
