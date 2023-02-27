const socket = io('http://192.168.10.154:8080/', { transports: ['websocket'] });
console.log(socket);

let message = document.getElementById('message');
console.log(message.value);
let messages = document.getElementById('messages');
console.log(messages);
let sender_name;
$(document).ready(function (e) {
   sender_name = prompt('Enter your name');
   socket.emit('findAllChat', {}, (res) => {
    console.log('hereeeeeeeeeeeeeeeeeee');
    for (const message of res) {
      console.log('message===> forof', message);
      handleNewMsg(`${message.sender_name} : ${message.text}`);
    }
  });
});

$('#submit').click(function (e) {
  e.preventDefault();
  socket.emit('createChat', {
    sender_name,
    text: message.value,
  });
});

socket.on('message', (message) => {
  console.log('message ==>scocket.on', message);
  handleNewMsg(message);
});

const handleNewMsg = (message) => {
  console.log('message=>', message);
  messages.appendChild(buildNewTag(message));
};

const buildNewTag = (message) => {
  console.log('message==>', message);
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
