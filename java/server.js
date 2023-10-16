const express = require('express')
const app = express()


app.get('/', (req, res) => {
    res.sendFile(__dirname+'/java.html')
})
app.use('/', (req, res) => {
    res.sendFile(__dirname+'/pr.js')
})
app.use('/', (req, res) => {
    res.sendFile(__dirname+'/design.css')
})

const PORT = 2000

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})