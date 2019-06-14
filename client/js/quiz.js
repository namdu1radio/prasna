let userName, userAge, loginForm, quizPanel, connectingMsg, socket;
let quizQuestion, quizOptionA, quizOptionB, quizOptionC, quizOptionD;
let thisQuestionAnswered = false; // so that user cant press button again and again

window.onload = function(){
  loginForm = document.getElementById("login-form");
  quizPanel = document.getElementById("quiz-panel");
  connectingMsg = document.getElementById("connecting-message");

  quizQuestion = document.getElementById("quiz-question-text");
  quizOptionA = document.getElementById("option-a");
  quizOptionB = document.getElementById("option-b");
  quizOptionC = document.getElementById("option-c");
  quizOptionD = document.getElementById("option-d");

  
  const quizOptionButtons = document.getElementsByClassName("option-buttons");
  Array.from(quizOptionButtons).forEach(function(optionButton) {
    optionButton.addEventListener('click', handleOptionButtonClick);
  });

  quizPanel.style = "display:none"; // hiding quiz panel by default, till user enters details
  connectingMsg.style = "display:none"; // hiding message box

  const loginButton = document.getElementById("login-form-submit");
  loginButton.addEventListener("click", handleLoginFormSubmit);
}

function handleLoginFormSubmit(){
  const uname = document.getElementById("login-form-user-name").value;
  const uage = document.getElementById("login-form-user-age").value;
  
  if (!uname || !uage) {
    return alert("Name and Age are requied");
  }

  if (Number.isNaN(Number(uage))) {
    return alert("Age should be valid number");
  }
  
  userName = uname;
  userAGe = uage;
  loginForm.style = "display:none"; //hiding login form
  connectingMsg.style = null; //displaying connecting to socket message
  return boot();
}

function boot() {
  
  socket = io("http://127.0.0.1:1337/");
  socket.on('connect_error', whenSocketFails);
  socket.on('connect', startQuiz);
  socket.on('newQuestion', handleNewQuestion);
}

function whenSocketFails() {
  return alert("Unable to connect to server");
}

function startQuiz() {
  connectingMsg.style = "display:none"; //hiding "connecting message"
  quizPanel.style = null; //displaying quiz panel'
}

function incomingMessage(message){
  console.log(message);
}

function handleOptionButtonClick(event) {
  if (thisQuestionAnswered) {
    alert("You have already answered this question, wait for next question");
  } else {
    const quizReply = {
      type: "quizReply",
      name: userName,
      age: userAge,
      question: document.getElementById("quiz-question").value,
      answer: event.target.innerText
    };
    event.target.style = "background-color: #ff0000";
    socket.emit("quizReply", quizReply);
    thisQuestionAnswered = true;
  }
}

function handleNewQuestion(content) {
  console.log(content);
  quizQuestion.innerText = content.question;
  quizOptionA.innerText = "a. " + content.optionA;
  quizOptionB.innerText = "b. " + content.optionB;
  quizOptionC.innerText = "c. " + content.optionC;
  quizOptionD.innerText = "d. " + content.optionD;

  quizOptionA.style = null;
  quizOptionB.style = null;
  quizOptionC.style = null;
  quizOptionD.style = null;
  
  thisQuestionAnswered = false;
}