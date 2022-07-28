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

var timePerQuestion = 20; // seconds

var mainEl = document.querySelector("main");

// create the section that will contain the quiz question and the multiple choices
var sectionEl = document.createElement("section");
sectionEl.className = "page";

var questionNumber = 0;

var userMark = []; // stores user score for each questions

var timer = 0;


var clearPage = function(){
    document.querySelector(".page").remove();
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

    mainEl.appendChild(sectionEl)
};

var checkAnswer = function(userResponse){
    if (userResponse === quizContent[questionNumber].answer){
        userMark.push("correct");
    }else{
        userMark.push("incorrect");
    }
};

var createScoreSubmissionPage = function(){
    var headerEl = document.createElement("h2");
    headerEl.textContent = "All done";
    sectionEl.appendChild(headerEl);

    var scoreEl = document.createElement("p");
    scoreEl.textContent = "Your score is ";
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
    
var quiz = function(event){

    if(event.target.matches("#start-quiz")){
        //remove main page
        clearPage();

        //create quiz page
        createQuiz();
    }else if(event.target.matches(".question-options")){
        checkAnswer(event.target.textContent);
        questionNumber++;
        if(questionNumber < quizContent.length){
            clearSectionEl();
            createQuiz();
        }else{
            clearSectionEl();
            createScoreSubmissionPage();
        }
        
    }
    
};

mainEl.addEventListener("click", quiz);
