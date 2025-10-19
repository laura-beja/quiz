import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { saveQuizResult } from "./firestore.js";

let quizQuestions = [];
let timer = 180;
let timerInterval;
let score = 0;

// DOM References
const quizForm = document.getElementById('quiz-form');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const retryBtn = document.getElementById('retry-btn');
const resultDiv = document.getElementById('result');
const timerDisplay = document.getElementById('timer');

// Initialize
quizForm.innerHTML = "";
submitBtn.style.display = "none";
retryBtn.style.display = "none";

// Verify user is logged in before starting quiz
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("You must be logged in to take the quiz.");
    window.location.href = "/";
  }
});

// Load questions (static JSON or backend endpoint)
fetch("/questions.json")
  .then(response => response.json())
  .then(data => {
    quizQuestions = data;
  })
  .catch(err => console.error("Error loading questions:", err));


// Start Quiz Button
startBtn.addEventListener("click", () => {
  renderQuiz();
  startTimer();
  startBtn.style.display = "none";
  submitBtn.style.display = "inline-block";
});


// Submit Quiz Button
if (submitBtn) {
  submitBtn.addEventListener("click", submitQuiz);
}


// Retry Button
if (retryBtn) {
  retryBtn.addEventListener("click", () => {
    // Reset state
    timer = 180;
    score = 0;
    clearInterval(timerInterval);
    quizForm.innerHTML = "";
    resultDiv.innerHTML = "";
    submitBtn.disabled = false;
    submitBtn.style.display = "inline-block";
    retryBtn.style.display = "none";

    // Restart
    renderQuiz();
    startTimer();
  });
}


// Timer logic
function startTimer() {
  timerDisplay.textContent = timer;
  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}


// Render Quiz Questions
function renderQuiz() {
  quizForm.innerHTML = "";
  quizQuestions.forEach((q, idx) => {
    const block = document.createElement("div");
    block.className = "question-block";
    block.innerHTML = `
      <h3>${idx + 1}. ${q.question}</h3>
      <img src="${q.image}" alt="Sign image" class="sign-image" style="max-height:80px; margin-bottom:10px;">
      <fieldset>
      ${q.options.map((opt, i) =>
            `<label>
              <input type="radio" name="${idx}" value="${i}" required>
              ${opt}
            </label><br>`
        ).join("")}
        </fieldset>
        `;
    quizForm.appendChild(block);
  });
}


// Evaluate and Save Score
async function submitQuiz() {
  clearInterval(timerInterval);
  submitBtn.disabled = true;

  const formData = new FormData(quizForm);
  let score = 0;
  let wrongAnswers = [];

  quizQuestions.forEach((q, idx) => {
    const selectedValue = formData.get(`${idx}`);
    const selectedIndex = selectedValue !== null ? parseInt(selectedValue) : -1;

    if (parseInt(selectedIndex) === q.answer) {
      score++;
    } else {
      wrongAnswers.push(idx + 1);
    }
  });

  console.log("Final Score:", score);

  const totalQuestions = quizQuestions.length;
  const resultText = `You scored ${score}/${totalQuestions}`;

  resultDiv.innerHTML = `
    <h2>${resultText}</h2>
    <p>${score >= 8 ? "Pass" : "Fail"}</p>
    ${
      wrongAnswers.length > 0
        ? `<p>Questions answered incorrectly: ${wrongAnswers.join(", ")}</p>`
        : `<p>Perfect score! All answers correct.</p>`
    }
  `;

  retryBtn.style.display = "inline-block";
  submitBtn.style.display = "none";

  try {
    await saveQuizResult(score);
    console.log("Quiz result saved successfully");
  } catch (err) {
    console.error("Error saving quiz result:", err);
  }
}




// Logout button (optional)
const logoutBtn = document.getElementById("logout-btn");
logoutBtn?.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/";
});