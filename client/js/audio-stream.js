var connection = new RTCMultiConnection(); //RTC object which handles many-to-many connections

function displaySuccessConnectionMessage() {
  document.getElementById("audio-message-area").innerHTML = 
  `<h2 style="color: #5cb85c;">Connected to Audio Stream!</h2>`;
}

setTimeout(() => {
  connection.openOrJoin("namdu1radio-quiz-stream", function(isRoomExist, roomid) {
    displaySuccessConnectionMessage();
  });
}, 2000);

// by default, socket.io server is assumed to be deployed on your own URL
connection.socketURL = '/';

// comment-out below line if you do not have your own socket.io server
//connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

connection.socketURL = "http://192.168.1.15:443/";

connection.socketMessageEvent = 'namdu1radio-quiz-stream';

connection.session = {
    audio: true,
    video: false,
    oneway: true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false
};

connection.audiosContainer = document.getElementById('audio-container');
connection.onstream = function(event) {
  var width = parseInt(connection.audiosContainer.clientWidth / 2) - 20;
  var mediaElement = getHTMLMediaElement(event.mediaElement, {
      title: event.userid,
      buttons: ['full-screen'],
      width: width,
      showOnMouseEnter: false
  });

  connection.audiosContainer.appendChild(mediaElement);

  setTimeout(function() {
      mediaElement.media.play();
  }, 5000);

  mediaElement.id = event.streamid;
};

connection.onstreamended = function(event) {
  var mediaElement = document.getElementById(event.streamid);
  if (mediaElement) {
      mediaElement.parentNode.removeChild(mediaElement);
  }
};