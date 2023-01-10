const shell = document.getElementById("quizSection");
const highScoreEl = document.getElementById("highscores");
const timerEl = document.getElementById("time");
var body = document.body;
var quizData = [
  {
    question: "How many coding languages are there?",
    a: "over 700",
    b: "500-700",
    c: "100-500",
    d: "less than 100",
    correct: "over 700",
  },
  {
    question: 'What kind of bug is the term "coding bug" named after?',
    a: "Beetle",
    b: "BumbleBee",
    c: "Stomache Bug",
    d: " It's not named after a bug",
    correct: " It's not named after a bug",
  },
  {
    question: "What the name of the worlds fastest computer",
    a: "John",
    b: "Kyle",
    c: "Frank",
    d: "Fugaku",
    correct: "Fugaku",
  },
  {
    question: "How much did the first computer ever weigh?",
    a: "20lb",
    b: "20kg",
    c: "20 tons",
    d: "27 tons",
    correct: "27 tons",
  },
  {
    question: "What was the first mouse made of ?",
    a: "copper",
    b: "steel",
    c: "aluminum",
    d: "wood",
    correct: "wood",
  },
];

var score;
var timeLeft;
var tmpTimeLeft;
let activeTimer;
var index;

// create homepage
function homePage() {
  shell.innerHTML =
    '        <h1>Coding Quiz</h1><p>Coding Quiz</p><button onclick="startQuiz()" type="submit">Start Quiz?</button>';
  index = 0;
  timeLeft = 60;
  tmpTimeLeft = timeLeft;
  score = 0;
}
// timer
function timerOut() {
  activeTimer = setInterval(() => {
    tmpTimeLeft -= 1;
    timerEl.innerText = `Time Left: ${tmpTimeLeft}`;

    if (tmpTimeLeft < 1) {
      clearInterval(activeTimer);
      quizDone();
    }
  }, 1000);
}

// start quiz
function startQuiz() {
  timerOut();
  nextQ();
}

// render next question
function nextQ() {
  shell.innerHTML = `
    <h2>${quizData[index].question}</h2>
    <ol>
        <button id="anwser1" onclick="checkAnswer(1)">${quizData[index].a}</button>
        <button id="anwser2" onclick="checkAnswer(2)">${quizData[index].b}</button>
        <button id="anwser3" onclick="checkAnswer(3)">${quizData[index].c}</button>
        <button id="anwser4" onclick="checkAnswer(4)">${quizData[index].d}</button>
    </ol>
    `;
}

// check answer

function checkAnswer(choice) {
  var foot = document.createElement("footer");
  document.getElementById("quizSection").appendChild(foot);
  console.log(Object.values(quizData[index]));

  if (Object.values(quizData[index])[choice] == quizData[index].correct) {
    score += 1;
    foot.textContent = "Correct!";
  } else {
    tmpTimeLeft -= 10;
    foot.textContent = "Incorrect!";
  }
  setTimeout(() => {
    foot.textContent = "";
  }, 1000);
  index = index + 1;
  if (index < quizData.length && timeLeft > 0) {
    nextQ();
  } else {
    clearInterval(activeTimer);
    quizDone();
  }
}

// finishquiz

function quizDone() {
  shell.innerHTML = `
    <h2>All Done!</h2>
    <p>Your score is ${score}</p>
    <form>
        <p>Enter Initials:</p>
        <input type="text" placeholder="initials" id = 'input'>
        <button id = "submitEl">Submit</button>
    </form>
    `;
  const formEl = document.getElementById("submitEl");
  formEl.addEventListener("click", saveName);
}

// save user
function saveName(event) {
  event.preventDefault();
  initials = document.getElementById("input").value;
  var scores = localStorage.getItem("scores");
  if (!scores) {
    scores = [];
  } else {
    scores = scores.match(/[^,]+,[^,]+/g);
  }
  var scoreSet = [initials, score];
  scores = scores.concat(scoreSet);
  localStorage.setItem("scores", scores);
  scores = localStorage.getItem("scores");
  createHighscores(event);
}

function createHighscores(event) {
  event.preventDefault();
  if (activeTimer) {
    clearInterval(activeTimer);
  }
  shell.innerHTML =
    '<h1>HighScores</h1><ul id = "list"></ul><button id = "clear">clear</button><button id = "back">back</button>';
  var clearEl = document.getElementById("clear");
  var backEl = document.getElementById("back");
  var list = document.getElementById("list");
  var scores = localStorage.getItem("scores").split(",");
  if (scores) {
    for (var i = 0; i < scores.length - 1; i += 2) {
      let liEl = document.createElement("li");
      liEl.textContent = `${scores[i]} - ${scores[i + 1]}`;
      list.appendChild(liEl);
    }
  }
  clearEl.addEventListener("click", function () {
    list.innerHTML = "";
    localStorage.setItem("scores", []);
  });
  backEl.addEventListener("click", homePage);
}

highScoreEl.addEventListener("click", createHighscores);

homePage();
