const express = require('express');
const path = require('path');
const socket = require('socket.io');

const port = 8000;
const messages = [];
const users = [];

const app = express();


app.use(express.static(path.join(__dirname, '/client/')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
});

const io = socket(server);
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  
  socket.on('newUser' , (user) => {
    users.push({name: user.userName, id: socket.id})
    console.log('users: ', users);
    const loginNotification = {author: 'ChatBot', content: `${user.userName} has joined the converstaion`};
    socket.broadcast.emit('message', loginNotification)
  })

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    leaverData = users.find(user => user.id === socket.id);

    if (leaverData) {
      const logoutNotification = {author: 'ChatBot', content: `${leaverData.name} has left the converstaion`};
      socket.broadcast.emit('message', logoutNotification);
    };

    leaverIndex = users.findIndex(user => user.id === socket.id);
    if (leaverIndex >= 0) users.splice(leaverIndex, 1);

    console.log('users: ', users);
  });
  console.log('I\'ve added a listener on message event \n');
});