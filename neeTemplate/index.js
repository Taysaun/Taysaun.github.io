const fs = require("fs")

var data = fs.readFileSync("data.json")

data = JSON.parse(data)

const express = require('express')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

const PORT = 200

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('dataform')
})

app.post('/submit', (req, res) => {
    var name = req.body.nameIn
    var number = Number(req.body.numberIn)
    if (name in data) {
        data[name] += number
        console.log(number)
    } else {
        data[name] = number
    }
    fs.writeFileSync("data.json", JSON.stringify(data))
    res.redirect('/')
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})




