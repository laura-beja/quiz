let quizQuestions = [];
let timer = 180;
let timerInterval;

// Load quiz questions (request quiz data from the backend api)
fetch('/api/questions')
  .then(response => response.json())
  .then(data => {
    quizQuestions = data;
    console.log("Loaded questions:", quizQuestions); // debugging
  });

function startTimer() {
  document.getElementById('timer').textContent = timer;
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById('timer').textContent = timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function renderQuiz() {
  const quizForm = document.getElementById('quiz-form');
  quizForm.innerHTML = '';
  // debugging
  console.log('Type:', typeof quizQuestions, 'Is Array:', Array.isArray(quizQuestions));

  quizQuestions.forEach((q, idx) => {
    const block = document.createElement('div');
    block.className = 'question-block';
    block.innerHTML = `
      <div class="question-text">${idx + 1}. ${q.question}</div>
      <img src="${q.image}" alt="Sign image" class="sign-image" style="max-height:80px; margin-bottom:10px;">
      <div class="options">
        ${q.options.map((option, optIdx) =>
          `<label>
            <input type="radio" name="q${idx}" value="${optIdx}">
            ${option}
          </label>`
        ).join('')}
      </div>
    `;
    quizForm.appendChild(block);
  });
}

function submitQuiz() {
    document.getElementById('submit-btn').disabled = true;
    clearInterval(timerInterval);

    let score = 0;
    let wrongAnswers = [];
    
    quizQuestions.forEach((q, idx) => {
        const radios = document.getElementsByName(`q${idx}`);
        let selected = -1;
        for (let r = 0; r < radios.length; r++) {
            if (radios[r].checked) {
            selected = r;
            break;
        }
    }
        if (selected === q.answer) {
            score++;
        } else {
        wrongAnswers.push(idx + 1);
        }
    });

    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML =
    (score >= 8 ? "Congratulations! You passed.<br>" : "") +
    `Your score: ${score}/10` +
    (score < 8 ? `<br>Questions wrong: ${wrongAnswers.join(', ') || "None"}<br>Try again!` : "");

    document.getElementById('retry-btn').style.display = score >= 8 ? "none" : "inline-block";
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // Hide questions and submit/retry buttons initially
    document.getElementById('quiz-form').innerHTML = "";
    document.getElementById('submit-btn').style.display = "none";
    document.getElementById('retry-btn').style.display = "none";

    // Start Quiz Button
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', function () {
        renderQuiz();
        startTimer();
        startBtn.style.display = "none";
        document.getElementById('submit-btn').style.display = "inline-block";
    });

    // Submit button
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.addEventListener('click', submitQuiz);

    // Retry button
    const retryBtn = document.getElementById('retry-btn');
     if (retryBtn) retryBtn.addEventListener('click', () => {

        // resetting necessary states
        timer = 180;
        document.getElementById('submit-btn').disabled = false;
        document.getElementById('quiz-form').innerHTML = "";
        document.getElementById('result').innerHTML = '';
         
        renderQuiz();
        startTimer();
        retryBtn.style.display = 'none';    // hides retry btn
    });
});
