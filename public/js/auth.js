import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const logoutBtn = document.getElementById("logout-btn");

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email, password } = e.target;
  try{
    await signInWithEmailAndPassword(auth, email.value, password.value);
    } catch (error) {
        alert(error.message);
    }
});

signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email, password } = e.target;
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);}
    catch (error) {
        alert(error.message);
    }
});

logoutBtn?.addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname === "/") {
    window.location.href = "/quiz";
  } else if (!user && window.location.pathname !== "/") {
    window.location.href = "/";
  }
});