const { log } = require('console')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/chat', (req, res) => {

})

app.listen(3000, (err) => {
    if(err) {
        log(err)
    } else {
        log("Server listening on port 3000")
    }
})