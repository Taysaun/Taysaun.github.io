const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

var players = {}

io.on('connection', (socket) => {
    console.log('connection')
    socket.on('click', () => {
        console.log(socket.id)
    })
})

http.listen(3000, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('server running on port 3000')
    }
})