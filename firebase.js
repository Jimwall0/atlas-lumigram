import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPZRwY_JlOCR0rM5s7SRG-D7zYKC9GgBo",
  authDomain: "social-chatting-a9eb0.firebaseapp.com",
  projectId: "social-chatting-a9eb0",
  storageBucket: "social-chatting-a9eb0.firebasestorage.app",
  messagingSenderId: "474286335767",
  appId: "1:474286335767:web:f0da241bf470ab4af47952",
  measurementId: "G-GRN9EF27SR"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();

export default app;