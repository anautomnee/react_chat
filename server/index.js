import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import 'dotenv/config';

const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
let users = [];

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: clientUrl,
    }});

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('newUser', (data) => {
        //Adds the new user to the list of users
        users.push(data);
        console.log(users);
        //Sends the list of users to the client
        io.emit('newUserResponse', users);
    });

    socket.on('message', (msg) => {
        io.emit('messageResponse', msg);
    });

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter((user) => user.socketId !== socket.id);
        console.log(users);
        //Sends the list of users to the client
        io.emit('newUserResponse', users);
        socket.disconnect();
    });
})

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
