// public/js/profile.js
import { auth } from "./firebase-config.js";
import { getQuizHistory } from "./firestore.js";
import { onAuthStateChanged, 
    signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const historyList = document.getElementById("history");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const attempts = await getQuizHistory();
      historyList.innerHTML = "";

      if (attempts.length === 0) {
        historyList.innerHTML = "<li>No quiz attempts yet.</li>";
        return;
      }

      attempts
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .forEach((attempt) => {
          const li = document.createElement("li");
          const timeString = new Date(attempt.timestamp).toLocaleString();
          li.textContent = `Score: ${attempt.score} ........ Timestamp: ${timeString}`;
          historyList.appendChild(li);
        }); 
    } catch (error) {
      console.error("Error loading history:", error);
      historyList.innerHTML = "<li>Error loading quiz history.</li>";
    }
  } else {
    historyList.innerHTML = "<li>Please log in to view your history.</li>";
  }
});

// logout 
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
    window.location.href = "/"; // redirect to login page
  } catch (error) {
    console.error("Logout failed:", error);
  }
});
