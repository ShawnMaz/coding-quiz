var quizContent = [
  {
    question: "Which of the following statments prints to the console?",
    options: [
      "document.querySelector();",
      "console.log();",
      "console.print();",
      "document.alert();",
    ],
    answer: "console.log();",
  },
  {
    question: "Who invented the JavaScript programming language?",
    options: [
      "Brendan Eich",
      "Bjarne Stroustrup",
      "Dennis Ritchie",
      "Michael Jackson",
    ],
    answer: "Brendan Eich",
  },
  {
    question: "What is the official name of JavaScript?",
    options: ["BASH", "ECMAScript", "EDMAScript", "Netscape"],
    answer: "ECMAScript",
  },
  {
    question: "Where is JavaScript places inside an HTML document or page?",
    options: [
      "In the <title> section.",
      "In the <footer> section.",
      "In the <meta> section.",
      "In the <body> and <head> sections.",
    ],
    answer: "In the <body> and <head> sections.",
  },
  {
    question:
      "Which bulit in function is used to generate a random number in JavaScript",
    options: [
      "math.random()",
      "Math.random()",
      "math.Random()",
      "Math.Random()",
    ],
    answer: "Math.random()",
  },
];

var timePerQuestion = 10; // seconds

var mainEl = document.querySelector("main");

var headerEl = document.querySelector("#header-element");

// create the section that will contain the quiz question and the multiple choices
var sectionEl = document.createElement("section");
sectionEl.className = "page";

var questionNumber = 0;

var userMark = []; // stores user score for each questions

var timer = quizContent.length * timePerQuestion;

var score = [];

// This function puts the timer in the header
var changeHeaderToTimer = function () {
  headerEl.textContent = `Time: ${timer}`;
};

// This function puts the `View High Score` link in the header
var changeHeaderToViewHighScore = function () {
  headerEl.textContent = "View High Score";
};

// This function deletes the old section element and create a new one for the
// new page
var clearSectionEl = function () {
  mainEl.children[0].remove();
  sectionEl = document.createElement("section");
  sectionEl.className = "page";
};

// This functions creates the questions and choices presented once the quiz starts
var createQuestionAndChoices = function () {
  // create the question
  var questionEl = document.createElement("h2");
  questionEl.textContent = quizContent[questionNumber].question;
  sectionEl.appendChild(questionEl);

  // create the multiple choice options
  var multipleChoiceEl = document.createElement("ul");
  var answerOptions = quizContent[questionNumber].options;
  for (var i = 0; i < answerOptions.length; i++) {
    var optionEl = document.createElement("li");
    var buttonEl = document.createElement("button");
    buttonEl.textContent = `${answerOptions[i]}`;
    buttonEl.className = "question-options";

    optionEl.appendChild(buttonEl);
    multipleChoiceEl.appendChild(optionEl);
  }
  sectionEl.appendChild(multipleChoiceEl);
};

// This fuction creates the results panel at the bottom of the quiz
// and the score submission page. It shows which question the user got right
// or wrong
var createResults = function () {
  // create the results
  var resultsEl = document.createElement("h3");
  resultsEl.textContent = "Results";
  sectionEl.appendChild(resultsEl);
  var resultsInfoContainerEl = document.createElement("div");
  resultsInfoContainerEl.className = "result";
  for (var i = 0; i < quizContent.length; i++) {
    var spanEl = document.createElement("span");
    spanEl.textContent = `Q${i + 1}`;
    // Apply the right color based on the user's correct or incorrect response
    if (userMark.length > 0) {
      if (userMark[i]) {
        if (userMark[i] === "correct") {
          spanEl.setAttribute("style", "background-color: green;");
        } else {
          spanEl.setAttribute("style", "background-color: red;");
        }
      }
    }
    resultsInfoContainerEl.appendChild(spanEl);
  }
  sectionEl.appendChild(resultsInfoContainerEl);
};

// This function creates the quiz by calling all the other helper functions
var createQuiz = function () {
  createQuestionAndChoices();

  createResults();

  mainEl.appendChild(sectionEl);
};

// This function checks the user answers and marks te responses as correct or incorrect
// It also applies penaly of -10 seconds for an incorrect response
var checkAnswer = function (userResponse) {
  if (userResponse === quizContent[questionNumber].answer) {
    userMark.push("correct");
  } else {
    userMark.push("incorrect");
    timer = timer - 10 > 0 ? (timer -= 10) : (timer = 0);
  }
};

// This function creates the score submission page
var createScoreSubmissionPage = function () {
  changeHeaderToViewHighScore();

  // create page header
  var headerEl = document.createElement("h2");
  headerEl.textContent = "All done";
  sectionEl.appendChild(headerEl);

  // Creates the paragraph that display's the user score after the quiz
  var scoreEl = document.createElement("p");
  scoreEl.textContent = `Your score is ${timer} points.`;
  sectionEl.appendChild(scoreEl);

  // Creates the div element that contains the input box for the initial
  // and the save score button
  var divEl = document.createElement("div");
  divEl.className = "score-submission";
  var labelEl = document.createElement("label");
  labelEl.setAttribute("for", "score-box");
  labelEl.textContent = "Enter Initials:";
  divEl.appendChild(labelEl);
  var inputEl = document.createElement("input");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("name", "score");
  inputEl.setAttribute("id", "score-box");
  divEl.appendChild(inputEl);
  var btnEl = document.createElement("button");
  btnEl.textContent = "Save";
  btnEl.setAttribute("id", "submit-score");
  divEl.appendChild(btnEl);
  sectionEl.appendChild(divEl);

  // Creates the results panels at the bottom of the page
  createResults();

  mainEl.appendChild(sectionEl);
};

// Decalring a start timer variable globally so that it is accessible everywhere
var startTimer;

// This function removes time from the timer as long as time is above 0
// and will change the header from `View High Score` to show the timer.
// Once the time reaches 0, it will change the header back to `View High Score`
// and stop the timer and take the user to the score submission page.
var quizTimer = function () {
  if (timer > 0) {
    timer--;
    changeHeaderToTimer();
  } else {
    changeHeaderToViewHighScore();
    clearInterval(startTimer);
    clearSectionEl();
    createScoreSubmissionPage();
  }
};

// This function reads scores saved in the browser's localStorage and
// stores it into an array
var readSavedScores = function () {
  if (!JSON.parse(localStorage.getItem("highScores"))) {
    score = [];
  } else {
    score = JSON.parse(localStorage.getItem("highScores"));
  }
};

// This function sorts the scores stored in the array from highest to lowest
var sortHighScores = function () {
  var scoreData = {
    name: score[0].name,
    points: score[0].points,
  };
  for (var i = 0; i < score.length; i++) {
    if (score[i].points > scoreData.points) {
      scoreData.name = score[i].name;
      scoreData.points = score[i].points;

      score.splice(i, 1);

      score.unshift(scoreData);
    }
  }
};

// This function calls the function to read scores from the browser's local storage
// and then adds the user's current score to the array. It then calls the function
// to sort the array and then it saves the array full of scores to the localStorage
var saveUserScore = function () {
  readSavedScores();
  var userScore = document.querySelector("input[name='score']");
  var userScoreData = {
    name: userScore.value,
    points: timer,
  };
  userScore.value = "";
  score.push(userScoreData);
  sortHighScores();
  localStorage.setItem("highScores", JSON.stringify(score));
};

// This function creates the High Score page
var createHighScoresPage = function () {
  // Create the page title
  var titleEl = document.createElement("h2");
  titleEl.textContent = "High Scores";
  sectionEl.appendChild(titleEl);

  // Creates the unordered list
  var scoreUlEl = document.createElement("ul");
  sectionEl.className = "page high-score-list";
  readSavedScores();
  sortHighScores();

  // checking to see if there are any previous scores available.
  // If there are none it will say no high scores.
  // If there are previous high scores that it will show a maximum of 10 high scores
  if (score.length === 0) {
    var scoreLiEl = document.createElement("li");
    scoreLiEl.textContent = "No saved high scores";
  } else {
    for (var i = 0; i < score.length; i++) {
      if (i > 9) {
        break;
      }
      var scoreLiEl = document.createElement("li");
      scoreLiEl.textContent = `${i + 1}. ${score[i].name} ----> ${
        score[i].points
      }`;
      scoreUlEl.appendChild(scoreLiEl);
    }
  }
  sectionEl.appendChild(scoreUlEl);

  // creates the div element that contains the buttons to go back home and clear
  // the high score list stored in the browser
  var scoreDivEl = document.createElement("div");
  scoreDivEl.className = "high-score";
  var homeButtonEl = document.createElement("button");
  homeButtonEl.setAttribute("id", "home");
  homeButtonEl.textContent = "Home";
  scoreDivEl.appendChild(homeButtonEl);
  var clearScoreButtonEl = document.createElement("button");
  clearScoreButtonEl.setAttribute("id", "clear-score");
  clearScoreButtonEl.textContent = "Clear Score";
  scoreDivEl.appendChild(clearScoreButtonEl);
  sectionEl.appendChild(scoreDivEl);

  mainEl.appendChild(sectionEl);
};

// When the clear high score button in the high score is pressed,
// this function triggers and clears the page and shows the user that there
// are no high scores to show
var clearHighScores = function () {
  // resets the scores array in the program
  score = [];

  // creates the page title
  var titleEl = document.createElement("h2");
  titleEl.textContent = "High scores";
  sectionEl.appendChild(titleEl);

  // creates the paragraph that says non sscore to shw
  var paragraphEl = document.createElement("p");
  paragraphEl.textContent = "No Scores to show";
  sectionEl.appendChild(paragraphEl);

  // creates the div element that contains the buttons to go back home and clear
  // the high score list stored in the browser
  var scoreDivEl = document.createElement("div");
  scoreDivEl.className = "high-score";
  var homeButtonEl = document.createElement("button");
  homeButtonEl.setAttribute("id", "home");
  homeButtonEl.textContent = "Home";
  scoreDivEl.appendChild(homeButtonEl);
  var clearScoreButtonEl = document.createElement("button");
  clearScoreButtonEl.setAttribute("id", "clear-score");
  clearScoreButtonEl.textContent = "Clear Score";
  scoreDivEl.appendChild(clearScoreButtonEl);
  sectionEl.appendChild(scoreDivEl);

  mainEl.appendChild(sectionEl);
};

// This function creates the home page
var createHomePage = function () {
  // creates page title
  var titleEl = document.createElement("h1");
  titleEl.textContent = "Coding Quiz";
  sectionEl.appendChild(titleEl);

  // creates quiz instructions paragraph
  var paragraphEl = document.createElement("p");
  paragraphEl.textContent =
    "Try to answer the following code-related questions within the time limit. keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  sectionEl.appendChild(paragraphEl);

  // creates the start quiz button
  var buttonEl = document.createElement("button");
  buttonEl.textContent = "Start Quiz";
  buttonEl.setAttribute("id", "start-quiz");
  sectionEl.appendChild(buttonEl);

  mainEl.appendChild(sectionEl);
};    

// This function determines which click event will take you where and
// calls the required helper functions to create the correct page
var quiz = function (event) {
  var buttonClick = event.target;

  // starts the quiz from the main page
  if (buttonClick.matches("#start-quiz")) {
    timer = quizContent.length * timePerQuestion;
    // start timer
    startTimer = setInterval(quizTimer, 1000);

    //remove main page
    clearSectionEl();

    //create quiz page
    createQuiz();

    // once the quiz has started this condition is checked.
  } else if (buttonClick.matches(".question-options")) {
    // check users answer to the quiz qustion
    checkAnswer(event.target.textContent);

    // increment the question number so that createQuiz() will go to the next question
    questionNumber++;

    // new questions will be shown if there are still more questions left
    // and the there is still time left
    if (questionNumber < quizContent.length && timer > 0) {
      clearSectionEl();
      createQuiz();

      // if there are no questions or time left, then the score submission
      // page will be shown
    } else {
      clearSectionEl();
      // stopping the timer for when the user completes the quiz
      // before the timer reaches 0.
      clearInterval(startTimer);
      createScoreSubmissionPage();

      // reset the question to 0 for when the user wants to restart the quiz
      // it will start from the beginning again.
      questionNumber = 0;
    }
    // In the score submission page if the user clicks on the submit score button
    // then the follwin code triggers
  } else if (buttonClick.matches("#submit-score")) {
    saveUserScore();
    clearSectionEl();
    createHighScoresPage();

    // resetting the userMark to remove data from the user's last quiz.
    userMark = [];

    // for the clear score button in the High Score page
  } else if (buttonClick.matches("#clear-score")) {
    clearSectionEl();

    // clears saved data in the crowser's local storage
    localStorage.clear();

    // resets the score[] which has a history of the high scores
    score = [];
    clearHighScores();

    // for the home button in the High Score Page
  } else if (buttonClick.matches("#home")) {
    clearSectionEl();
    createHomePage();
  }
};

// listening click events on the main element in the body
mainEl.addEventListener("click", quiz);

// This function checkes what was clicked in the header element
var headerHighScorePageNavigation = function (event) {
  var buttonClick = event.target;
  if (buttonClick.matches("#header-element")) {
    if (score.length === 0) {
      clearSectionEl();
      // when the element is clicked but there is no high score to show,
      // it will show you the empty High score page
      clearHighScores();
    } else {
      clearSectionEl();
      createHighScoresPage();
    }
  }
};

var headerHighScoreEl = document.querySelector("header");

// listening to the click events in the header section
headerHighScoreEl.addEventListener("click", headerHighScorePageNavigation);
