const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// const express = require("express")
// const app = express()
// const io = require("socket.io")(3000)
// const http = require("http").Server(app)

// //start http server
// // http.listen(3000, () => {
// //     console.log("server running on port 3000")
// // })


// app.use(express.static("public"))

// io.on("connection", (socket) => {
//     console.log("new user connected")
//     socket.emit("message", "Welcome to the chat")
//     socket.broadcast.emit("message", "A new user has joined the chat")
    
//     socket.on("sendMessage", (message) => {
//         io.emit("message", message)
//     })
    
//     socket.on("disconnect", () => {
//         io.emit("message", "A user has left the chat")
//     })
// })

// app.set("view engine", "ejs")

// app.get("/", (req, res) => {
//     res.render("index")
// })



app.use(express.static("public"));

var players = [];
var values = [];

io.on("connection", (socket) => {
    console.log("new user connected");
    socket.emit("message", "Welcome to the chat");
    socket.broadcast.emit("message", "A new user has joined the chat");

    socket.on("newPlayer", (player) => {
        players.push(player)
        if (players.length === 2) {
            io.emit("enough")
            players = [];
        }
    });

    socket.on("finish", (value) => {
        values.push(value);
        if (values.length === 2) {
            io.emit("compare")
            if (values[0] < values[1]) {
                io.emit("winner", "You win!")
            } else {
                io.emit("loser", "You Lose!")
            }
            values = [];
        }
    });
});

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/script.js", (req, res) => {
    res.sendFile(__dirname + "/script.js");
})

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/style.css");
});

http.listen(3000, (err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log("server running on port 3000")
    }
})