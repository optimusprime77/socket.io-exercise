const { info } = require('console');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('client connected');
    var info;
    socket.on('even number',(msg) => {
        console.log('message received');
        if (msg % 2 == 0){
            info = ' : Even Number';
        }
        else{
            info = ' : Not an even number'
        }
        io.emit('even number',msg + info)
        
    });
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});