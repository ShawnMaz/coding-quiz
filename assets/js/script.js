var quizContent = [
    {
        question: "Which of the following statments prints to the console?",
        options:[
            "document.querySelector();",
            "console.log();",
            "console.print();",
            "document.alert();"
        ],
        answer: "console.log();"
    },
    {
        question: "Who invented the JavaScript programming language?",
        options:[
            "Brendan Eich",
            "Bjarne Stroustrup",
            "Dennis Ritchie",
            "Michael Jackson"
        ],
        answer: "Brendan Eich"
    },
    {
        question: "What is the official name of JavaScript?",
        options:[
            "BASH",
            "ECMAScript",
            "EDMAScript",
            "Netscape"
        ],
        answer: "ECMAScript"
    },
    {
        question: "Where is JavaScript places inside an HTML document or page?",
        options:[
            "In the <title> section.",
            "In the <footer> section.",
            "In the <meta> section.",
            "In the <body> and <head> sections."
        ],
        answer: "In the <body> and <head> sections."
    },
    {
        question: "Which bulit in function is used to generate a random number in JavaScript",
        options:[
            "math.random()",
            "Math.random()",
            "math.Random()",
            "Math.Random()"
        ],
        answer: "Math.random()"
    }
]

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


var clearPage = function(){
    document.querySelector(".page").remove();
};

var changeHeaderToTimer = function(){
    headerEl.textContent = `Time: ${timer}`;
};

var changeHeaderToViewHighScore = function(){
    headerEl.textContent = "View High Score";
};

var clearSectionEl = function(){
    mainEl.children[0].remove();
    sectionEl = document.createElement("section");
    sectionEl.className = "page";
};

var createQuestionAndChoices = function(){
    // create the question
    var questionEl = document.createElement("h2");
    questionEl.textContent = quizContent[questionNumber].question;
    sectionEl.appendChild(questionEl);

    // create the multiple choice options
    var multipleChoiceEl = document.createElement("ul");
    var answerOptions = quizContent[questionNumber].options;
    for(var i = 0; i < answerOptions.length; i++){
        var optionEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.textContent = `${answerOptions[i]}`;
        buttonEl.className = "question-options";

        optionEl.appendChild(buttonEl);
        multipleChoiceEl.appendChild(optionEl);
    }
    sectionEl.appendChild(multipleChoiceEl);
};

var createResults = function(){
    // create the results
    var resultsEl = document.createElement("h3");
    resultsEl.textContent = "Results";
    sectionEl.appendChild(resultsEl);
    var resultsInfoContainerEl = document.createElement("div");
    resultsInfoContainerEl.className = "result"
    for (var i = 0; i < quizContent.length; i++){
        var spanEl = document.createElement("span");
        spanEl.textContent = `Q${i+1}`;
        if(userMark.length > 0){
            if(userMark[i]){
                if(userMark[i] === "correct"){
                    spanEl.setAttribute("style", "background-color: green;");
                }else{
                    spanEl.setAttribute("style", "background-color: red;");
                    
                }
            }
            
        }        
        resultsInfoContainerEl.appendChild(spanEl);
    }
    sectionEl.appendChild(resultsInfoContainerEl);
};

var createQuiz = function(){ 

    createQuestionAndChoices();

    createResults();

    mainEl.appendChild(sectionEl);
};

var checkAnswer = function(userResponse){
    if (userResponse === quizContent[questionNumber].answer){
        userMark.push("correct");
    }else{
        userMark.push("incorrect");
        timer = ((timer - 10) > 0) ? timer -= 10 : timer = 0;
    }
};

var createScoreSubmissionPage = function(){
    changeHeaderToViewHighScore();
    var headerEl = document.createElement("h2");
    headerEl.textContent = "All done";
    sectionEl.appendChild(headerEl);

    var scoreEl = document.createElement("p");
    scoreEl.textContent = `Your score is ${timer} points.`;
    sectionEl.appendChild(scoreEl);

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

    createResults();

    mainEl.appendChild(sectionEl);
};

var startTimer;

var quizTimer = function(){    
    if(timer>0){
        timer--;
        changeHeaderToTimer();
    }else{
        changeHeaderToViewHighScore();
        clearInterval(startTimer);
        clearSectionEl();
        createScoreSubmissionPage();
    }
};

var readSavedScores = function(){
    if(!JSON.parse(localStorage.getItem('highScores'))){
        score = [];
    } else {
        score = JSON.parse(localStorage.getItem('highScores'));
    }
};

var sortHighScores = function(){    
    var scoreData = {
        name:score[0].name,
        points:score[0].points
    }
    for(var i = 0; i < score.length; i++){
        if(score[i].points > scoreData.points){
            scoreData.name = score[i].name;
            scoreData.points = score[i].points;

            score.splice(i, 1);

            score.unshift(scoreData);
        }
    }    
}

var saveUserScore = function(){
    readSavedScores();
    var userScore = document.querySelector("input[name='score']");
    var userScoreData = {
        name: userScore.value,
        points: timer
    }
    userScore.value = "";
    score.push(userScoreData);
    sortHighScores();
    localStorage.setItem('highScores', JSON.stringify(score));
};

var createHighScoresPage = function(){
    var titleEl = document.createElement("h2");
    titleEl.textContent = "High Scores";
    sectionEl.appendChild(titleEl);

    var scoreUlEl = document.createElement("ul")
    sectionEl.className = "page high-score-list";
    readSavedScores();
    sortHighScores();

    if(score.length === 0){
        var scoreLiEl = document.createElement("li");
        scoreLiEl.textContent = "No saved high scores";
    } else{
        for (var i = 0; i < score.length; i++){
            if(i > 9){
                break;
            }
            var scoreLiEl = document.createElement("li");
            scoreLiEl.textContent = `${i+1}. ${score[i].name} ----> ${score[i].points}`;
            scoreUlEl.appendChild(scoreLiEl);        
        }
    }
    
    sectionEl.appendChild(scoreUlEl);

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

var clearHighScores = function(){
    score = [];
    var titleEl = document.createElement("h2");
    titleEl.textContent = "High scores";
    sectionEl.appendChild(titleEl);

    var paragraphEl = document.createElement("p");
    paragraphEl.textContent = "No Scores to show";
    sectionEl.appendChild(paragraphEl);

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

var createHomePage = function(){
    var titleEl = document.createElement("h1");
    titleEl.textContent = "Coding Quiz";
    sectionEl.appendChild(titleEl);

    var paragraphEl = document.createElement("p");
    paragraphEl.textContent = "Try to answer the following code-realted questions within the time limit. keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    sectionEl.appendChild(paragraphEl);

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Start Quiz";
    buttonEl.setAttribute("id", "start-quiz");
    sectionEl.appendChild(buttonEl);

    mainEl.appendChild(sectionEl);
}
    
var quiz = function(event){    
    var buttonClick = event.target;
    if(buttonClick.matches("#start-quiz")){
        timer = quizContent.length * timePerQuestion;
        // start timer
        startTimer = setInterval(quizTimer, 1000);

        //remove main page
        // clearPage();
        clearSectionEl();       

        //create quiz page
        createQuiz();
        
    }else if(buttonClick.matches(".question-options")){
        checkAnswer(event.target.textContent);
        questionNumber++;
        if((questionNumber < quizContent.length) && timer > 0){
            clearSectionEl();
            createQuiz();
        }else{
            clearSectionEl();
            clearInterval(startTimer);
            createScoreSubmissionPage();
            questionNumber = 0;
        }        
    }else if(buttonClick.matches("#submit-score")){
        saveUserScore();
        clearSectionEl();
        createHighScoresPage();
        userMark = [];
    }else if(buttonClick.matches("#clear-score")){
        clearSectionEl();
        localStorage.clear();
        score = [];
        clearHighScores();
    }else if(buttonClick.matches("#home")){
        clearSectionEl();
        createHomePage();
    }  
    
};

mainEl.addEventListener("click", quiz);

var headerHighScorePageNavigation = function(event){
    var buttonClick = event.target;
    if(buttonClick.matches("#header-element")){
        if (score.length === 0){
            clearSectionEl();
            clearHighScores();
        }else{
            clearSectionEl();
            createHighScoresPage();
        }
    }
};

var headerHighScoreEl = document.querySelector("header");
headerHighScoreEl.addEventListener("click", headerHighScorePageNavigation);
