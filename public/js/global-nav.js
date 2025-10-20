// geting the title element
const quizTitle = document.getElementById("quiz-title");

// if it exists on this page, make it clickable
if (quizTitle) {
  quizTitle.style.cursor = "pointer";

  quizTitle.addEventListener("click", () => {
    // redirect to quiz page
    window.location.href = "/quiz"; 
  });

}
