const express = require('express')
const sqlite3 = require('sqlite3')
const session = require('express-session')
const app = express()

let db = new sqlite3.Database("data.db", (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Database running')
    }
})

app.use(session({
    secret: 'Ths s nt my dg',
    saveUninitialized: false,
    resave: false
}))
app.use(express.urlencoded({extended: true}))

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('login')
    }
}

app.set("view engine", "ejs")

app.get('/', isAuthenticated, (req, res) => {
    res.render('index', {user: req.session.user})
})

app.get('/transaction', isAuthenticated, (req, res) => {
    res.render('transaction')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    db.get("SELECT * FROM users WHERE name=? AND password=?", [username, password], (err, row) => {
        if (row) {
            req.session.user = username
            req.session.id = row.uid
            res.redirect("/")
        } else {
            console.error(err)
        }
    })
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.listen(400, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Server running on port 400')
    }
})