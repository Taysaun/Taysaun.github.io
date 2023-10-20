const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('java')
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