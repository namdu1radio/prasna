const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

server.listen(1337);

const processQuizReply = require("./controllers/processQuizReply");
const sendNewQuestion = require("./controllers/sendNewQuestion");

let connectedUsers = 0;
// WebSocket server
io.on('connection', function(socket){
  connectedUsers += 1;

  socket.on('quizReply', processQuizReply);
  socket.on('newQuestion', (content) => sendNewQuestion(io, content));

  socket.on('disconnect', () => {
    // close user connection
    connectedUsers -= 1;
    
  });
});

