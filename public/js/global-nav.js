// public/js/global-nav.js

// Get the title element
const quizTitle = document.getElementById("quiz-title");

// if it exists on this page, make it clickable
if (quizTitle) {
  quizTitle.style.cursor = "pointer";

  quizTitle.addEventListener("click", () => {
    // redirect to quiz page
    window.location.href = "/quiz"; // or your Express route, e.g. "/quiz"
  });

  // Allow pressing "Enter" to trigger navigation (for accessibility)
  quizTitle.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      window.location.href = "/quiz";
    }
  });
}
