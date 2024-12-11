const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const session = require('express-session');
const http = require('http').Server(app)
const io = require('socket.io')(http)

const AUTH_URL = 'https://formbar.yorktechapps.com/oauth';
const THIS_URL = 'http://localhost:3000/login'; 

app.use(session({
    secret: 'make up a secret string here but never publish it!',
    resave: false,
    saveUninitialized: false
}))

app.get('/login', (req, res) => {
    if (req.query.token) {
         let tokenData = jwt.decode(req.query.token);
         req.session.token = tokenData;
         req.session.user = tokenData.username;
         res.redirect('/');
    } else {
         res.redirect(`${AUTH_URL}?redirectURL=${THIS_URL}`);
    };
});

app.get('/', isAuthenticated, (req, res) => {
    try {
         res.render('index.ejs', {user : req.session.user})
    }
    catch (error) {
         res.send(error.message)
    }
});

io.on('connection', (socket) => {
    console.log('connection')
    socket.join('General')
    socket.on('message', (text, room, user) => {
        io.to(room).emit('text', text, user)
    })
    socket.on('joinRoom', (room) => {
        console.log(socket.id)
        socket.join(room)
        io.to(socket.id).emit('roomList', socket.rooms)
    })
})

function isAuthenticated(req, res, next) {
    if (req.session.user) next()
    else res.redirect('/login')
};

http.listen(3000, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('server running on port 3000')
    }
})