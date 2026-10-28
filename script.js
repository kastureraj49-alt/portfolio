const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const questions = [
  {
    question: "You receive a message saying your account will close in 10 minutes unless you click a link. What should you do?",
    answers: ["Click quickly to save the account", "Open the official website separately and verify", "Forward the message to friends"],
    correct: 1,
    explanation: "Correct: urgency is a common pressure tactic. Verify through the official app or website instead of the message link."
  },
  {
    question: "A caller says they are support staff and asks you to read out your OTP. What is safest?",
    answers: ["Share it if they sound professional", "Share only the first few digits", "Do not share it; end the call and verify independently"],
    correct: 2,
    explanation: "Correct: never reveal an OTP or password to a caller. Contact the service through a verified channel if needed."
  },
  {
    question: "Which is the best password habit?",
    answers: ["Use one easy password everywhere", "Use long, unique passwords and enable MFA", "Write your password in a public profile"],
    correct: 1,
    explanation: "Correct: unique passwords reduce the impact of a leaked password, and multi-factor authentication adds another layer."
  }
];
let current = 0;
let answered = false;
const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const answersBox = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextQuestion");
const restartButton = document.getElementById("restartQuiz");

function renderQuestion() {
  answered = false;
  const q = questions[current];
  questionCount.textContent = `QUESTION ${current + 1} OF ${questions.length}`;
  questionText.textContent = q.question;
  feedback.textContent = "";
  answersBox.innerHTML = "";
  nextButton.disabled = true;
  nextButton.classList.remove("hidden");
  restartButton.classList.add("hidden");
  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.addEventListener("click", () => selectAnswer(index));
    answersBox.appendChild(button);
  });
}
function selectAnswer(index) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  [...answersBox.children].forEach((button, i) => {
    button.disabled = true;
    if (i === q.correct) button.classList.add("correct");
    if (i === index && i !== q.correct) button.classList.add("incorrect");
  });
  feedback.textContent = (index === q.correct ? "✓ " : "Not quite. ") + q.explanation;
  nextButton.disabled = false;
  if (current === questions.length - 1) nextButton.textContent = "See result →";
}
nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (current < questions.length - 1) {
    current += 1;
    nextButton.textContent = "Next question →";
    renderQuestion();
  } else {
    questionCount.textContent = "QUIZ COMPLETE";
    questionText.textContent = "Great job taking a moment to learn about online safety.";
    answersBox.innerHTML = "";
    feedback.textContent = "Remember: pause, verify, protect. Your answers stay in this browser and are not sent anywhere.";
    nextButton.classList.add("hidden");
    restartButton.classList.remove("hidden");
  }
});
restartButton.addEventListener("click", () => {
  current = 0;
  renderQuestion();
});
renderQuestion();
