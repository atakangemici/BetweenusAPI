var app = require('express')();
var http = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio(http, 
  {
    serveClient: true,
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
      credentials: true
    }
});



io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
       });
    console.log('a user connected');
  });

app.get('/', (req, res) => res.send('hello!'));
  http.listen(3000, () => {
  console.log('listening on *:3000');
});