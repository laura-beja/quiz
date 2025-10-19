// initialize firebase sdk
// firebase v10+ CDN-optimized imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiINpWKKrW2GzOP7C9Nk5RFoVhcsbGFVE",
  authDomain: "traffic-sign-quiz-59546.firebaseapp.com",
  projectId: "traffic-sign-quiz-59546",
  storageBucket: "traffic-sign-quiz-59546.firebasestorage.app",
  messagingSenderId: "79422508081",
  appId: "1:79422508081:web:3899047afbffbb791c5910"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
