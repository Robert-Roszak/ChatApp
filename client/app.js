const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;
const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));

const login = (event) => {
    event.preventDefault();
    if (userNameInput.value) {
        userName = userNameInput.value;
        socket.emit('newUser', {userName: userName});
        const userDOM = document.createElement('h2');
        userDOM.innerHTML = `Welcome ${userName}`;
        messagesSection.prepend(userDOM);
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
    else alert('Login can not be empty');
}

const sendMessage = (event) => {
    event.preventDefault();
    let messageContent = messageContentInput.value;

    if (messageContentInput.value) {
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, content: messageContent })
        messageContentInput.value = '';
    }
    else alert('You did not write anything');
}

const addMessage = (author, content) => {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) message.classList.add('message--self');
    if (author == 'ChatBot') message.classList.add('message--ChatBot');

    message.innerHTML = `
        <h3 class="message__author">${userName === author ? 'You' : author}</h3>
        <div class="message__content">
        ${content}
        </div>
    `;

    messagesList.appendChild(message);
}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
