const socket = io('http://192.168.10.154:8080/', { transports: ['websocket'] });


let message = document.getElementById('message');
let messages = document.getElementById('messages');
let users = document.getElementById('users');
let sender_name;
$(document).ready(async function (e) {
  sender_name = prompt('Enter your name');
  console.log(sender_name);
  socket.emit('findAllChat', { sender_name }, (res) => {
    for (const message of res.messages) {
      handleNewMsg(`${message.sender_name} : ${message.text}`);
    }
    for (const client_id in res.users) {
      handleNewUser(`${res.users[client_id]} : ${client_id}`);
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
  handleNewMsg(message);
});

const handleNewUser = (name, client_id) => {
  users.appendChild(buildNewTagUser(name, client_id));

  let all_li = document.querySelectorAll('.user-li');
  all_li.forEach((li) => {
    $(li).click(function (e) {
      e.preventDefault();
      let audience_id = li.getAttribute('client_id');
      socket.emit('findAllMsgPv',{audience_id}, (res) => {
        for (const message of res.messages) {
          handleNewMsg(`${message.sender_name} : ${message.text}`);
        }
        handleNewUser(res.sender_name, res.client_id);
        handleNewUser(res.audience_name, res.audience_id);
      });
      $('#submit').click(function (e) {
        e.preventDefault();
        socket.emit('messagePv', {audience_id:client_id}, (res) => {});
      });

      
    });
  });
};

const handleNewMsg = (message) => {
  $('#messages').html()=null
  messages.appendChild(buildNewTagMsg(message));
};

const buildNewTagMsg = (message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  li.classList.add('messages-li');
  // const li = `<li class="li-user-message">${message}</li>`
  return li;
};

const buildNewTagUser = (name, client_id) => {
  let index;
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(name));
  li.classList.add('user-li');
  li.setAttribute('client_id', client_id);
  return li;
};

