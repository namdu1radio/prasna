let adminSecret, loginForm, quizPanel, connectingMsg, socket;
let quizQuestion, quizOptionA, quizOptionB, quizOptionC, quizOptionD;
let thisQuestionSent = false; // so that user cant press button again and again

window.onload = function(){
  loginForm = document.getElementById("login-form");
  quizPanel = document.getElementById("quiz-panel");
  connectingMsg = document.getElementById("connecting-message");

  quizQuestion = document.getElementById("quiz-question-text");
  quizOptionA = document.getElementById("option-a");
  quizOptionB = document.getElementById("option-b");
  quizOptionC = document.getElementById("option-c");
  quizOptionD = document.getElementById("option-d");

  
  const publishQuizButton = document.getElementById("quiz-panel-publishquestion");
  publishQuizButton.addEventListener('click', handleQuizPublishClick);
  

  quizPanel.style = "display:none"; // hiding quiz panel by default, till user enters details
  connectingMsg.style = "display:none"; // hiding message box

  const loginButton = document.getElementById("login-form-submit");
  loginButton.addEventListener("click", handleLoginFormSubmit);
}

function handleLoginFormSubmit(){
  const secret = document.getElementById("login-form-admin-secret").value;
  
  if (!secret) {
    return alert("Admin secret is required before publishing the quiz");
  }
  
  adminSecret = secret;

  loginForm.style = "display:none"; //hiding login form
  connectingMsg.style = null; //displaying connecting to socket message
  return boot();
}

function boot() {
  
  socket = io("http://127.0.0.1:1337/");
  socket.on('connect_error', whenSocketFails);
  socket.on('connect', startQuiz);
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

function handleQuizPublishClick(event) {
  if (thisQuestionSent) {
    alert("You have already published this question, few wait for input to clear");
  } else {
    const questionContent = {
      password: adminSecret,
      question: quizQuestion.value,
      optionA: quizOptionA.value,
      optionB: quizOptionB.value,
      optionC: quizOptionC.value,
      optionD: quizOptionD.value
    };
    socket.emit("newQuestion", questionContent);
    quizQuestion.value = "";
    quizOptionA.value = "";
    quizOptionB.value = "";
    quizOptionC.value = "";
    quizOptionD.value = "";
    thisQuestionSent = false;
  }
}