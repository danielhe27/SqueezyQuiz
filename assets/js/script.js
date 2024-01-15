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

//  a random question will show
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  };
  
  // Function to display a question
  function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
  };
  
  // Function to reset the state (clears answer buttons and hides elements)
  function resetState() {
    nextButton.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
  };
  
  // Function to check if the answer is correct or not and after show a message, 
  function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
    if (correct) {
        checkAnswerEl.innerHTML = "You're SMART, You're right'!";
    } else {
        checkAnswerEl.innerHTML = "WROOONG!!! XXXX.";
        if (timeLeft <= 5) {
            timeLeft = 0;
        } else {
            timeLeft -= 9;
        }
    }
  
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
  
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startButton.classList.remove("hide")
        saveScore();
    }
  };
  
  // Function to set the status class for an answer button
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
  };
  
  // Function to clear status classes
  function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  };
  
  // Function to save the score
  function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;
    }, 2000)
  };
  
  // Function to load scores from local storage
  var loadScores = function () {
    var savedScores = JSON.parse(localStorage.getItem("scores")) || [];
  
    if (!savedScores) {
        return false;
    }
  
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    };
  
    savedScores.push(newScore);
    console.log(savedScores)
  
    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
  };
  
  // Function to show high scores
  function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }
  
    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;
  
        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }
  
    localStorage.setItem("scores", JSON.stringify(scores));
  };
  
  