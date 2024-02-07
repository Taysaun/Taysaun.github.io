const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require("path")

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(path.resolve("")));

let arr=[]
let playingArray=[]

io.on('connection', (socket) => {
    socket.on("find", (e)=>{
        if(e.name!=null) {
            arr.push(e.name)
            if (arr.length>=2) {
                let p1obj = {
                    p1name: arr[0],
                    p1value:"X",
                    p1move:""
                }
                let p2obj = {
                    p2name: arr[1],
                    p2value:"O",
                    p2move:""
                }

                let obj={
                    p1:p1obj,
                    p2:p2obj
                }
                playingArray.push(obj)
                arr.splice(0,2)

                io.emit("find", {allPlayers: playingArray})
            }
        }
    })
})



app.get('/', (req, res) => {
    return res.sendFile("index.html")
})


app.listen(3000, (err) => {
    if (err) {
    console.log(err);
    } else {
    console.log('Server is running on port 3000');
    }
})
