const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

var ball = {
    x: {
        speed: 0,
        position: 500,
        direction: 'none'
    },
    y: {
        speed: 0,
        position: 500,
        direction: 'none'
    },
    r: 12,
    speed: 0,
    angle: 0
        
}

var players = {
    player1: undefined,
    player2: undefined
}

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

io.on('connection', (socket) => {
    console.log('connection')
    socket.on('updateBall', (ballOb) => {
        ball = ballOb
        io.emit('sendBall', ball, players.player1)
    })
})

http.listen(3000, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('server running on port 3000')
    }
})