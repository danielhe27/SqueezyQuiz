// Adding all my variables to be used later in functions
var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

// this variable is for the questions on my quiz
var shuffledQuestions, currentQuestionIndex;

// is a listener wich mean, the code needs to do something qhen i click on start game
startButton.addEventListener("click", startGame);

// this listener sets up next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

// this timer functions make a countdown if the timer drops to 0 needs to call to save score function 
function timeTick() {
  timeLeft--;
  timerEl.textContent = "Time: " + timeLeft;
  if (timeLeft <= 0) {
      saveScore();
  }
}

// Function to start the game, how fast the timer goes in the count, also set a random question every time the game start
function startGame() {
  timerID = setInterval(timeTick, 1000);
  startContainerEl.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerEl.classList.remove("hide");

  // timer will start when the button is clicked 
  timeTick();
  setNextQuestion();
};

