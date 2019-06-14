function sendNewQuestion(io, content) {
  console.log(content);
  if (content.password === "123") {
    io.emit('newQuestion', {
      question: content.question,
      optionA: content.optionA,
      optionB: content.optionB,
      optionC: content.optionC,
      optionD: content.optionD
    });
  }
  
}

module.exports = sendNewQuestion;
