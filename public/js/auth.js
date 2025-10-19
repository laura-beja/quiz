import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const logoutBtn = document.getElementById("logout-btn");

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email, password } = e.target;
  await signInWithEmailAndPassword(auth, email.value, password.value);
});

signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email, password } = e.target;
  await createUserWithEmailAndPassword(auth, email.value, password.value);
});

logoutBtn?.addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname === "/") {
    window.location.href = "/quiz";
  } else if (!user && window.location.pathname !== "/") {
    window.location.href = "/";
  }
});