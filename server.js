var app = require('express')();
var http = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio(http,
    //Local
    {
        serveClient: true,
        cors: {
            origin: "http://localhost:4200",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    //Prod
    // {
    //     serveClient: true,
    //     cors: {
    //         origin: "https://aramizda-app.herokuapp.com",
    //         methods: ["GET", "POST"],
    //         credentials: true
    //     }
    // });

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
    console.log('a user connected');
});

//Local
app.get('/', (req, res) => res.send('hello!'));
http.listen(3000, () => {
    console.log('listening on *:3000');
});

//Prod
// app.get('/', (req, res) => res.send('hello!'));
// http.listen(process.env.PORT, () => {
//     console.log('listening on *:3000');
// });





