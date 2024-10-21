const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', isAuthenticated, (req, res) => {
    res.redirect('/profile')
})

app.get('/profile', isAuthenticated, (req, res) => {

})

app.listen(3000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('server running on port 3000')
    }
})