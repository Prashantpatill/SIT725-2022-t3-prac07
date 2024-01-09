let express = require('express');
let app = express();
let port = process.env.port || 3000;

const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));



io.on('connection',(socket)=>{
    console.log('Connected to port '+port);
    socket.on('disconnect', () => {
        console.log('Disconnected from Port '+ port);
    });
    setInterval(()=>{
        x = parseInt(Math.random()*10);
        socket.emit('number'+x);
        console.log("Emitting Number "+x);
    }, 1000)
});

http.listen(port, ()=>{
    console.log('Connection to express sever sucessful ');
});