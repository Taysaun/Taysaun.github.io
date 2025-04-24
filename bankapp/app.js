const express = require('express')
const sqlite3 = require('sqlite3')
const session = require('express-session')
const app = express()

app.use(session({
    secret: 'Ths s nt my dg',
    saveUninitialized: false,
    resave: false
}))

let db = new sqlite3.Database("data.db", (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Database running')
    }
})

app.use(express.urlencoded({extended: true}))

function isAuthenticated(req, res, next) {
    if (req.session.num) {
        next()
    } else {
        res.redirect('login')
    }
}

app.set("view engine", "ejs")

app.get('/', isAuthenticated, (req, res) => {
    db.get("SELECT * FROM users WHERE uid=?", req.session.num, (err, row) => {
        if (row) {
            console.log(row)
            res.render('index', {
                user: row.name,
                accountNum: row.accountNum,
                balance: row.balance
            })
        } else {
            console.error(err)
        }
    })
})

app.get('/transaction', isAuthenticated, (req, res) => {
    db.get("SELECT * FROM users WHERE uid=?", req.session.num, (err, row) => {
        if (row) {
            console.log(row)
            res.render('transaction', {
                user: row.name,
                accountNum: row.accountNum,
                balance: row.balance
            })
        } else {
            console.error(err)
        }
    })
})

app.post('/transaction', isAuthenticated, (req, res) => {
    let amount = req.body.amount
    let account = req.body.accountNumber
    db.run("UPDATE users SET balance = balance + ? WHERE accountNum=?", [amount, account], (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log("Receiver Update Successful")
        }
    })
    db.run("UPDATE users SET balance = balance - ? WHERE uid=?", [amount, req.session.num], (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log("Sender Update Successful")
        }
    })
    res.redirect("/")
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    db.get("SELECT * FROM users WHERE name=? AND password=?", [username, password], (err, row) => {
        if (row) {
            req.session.num = row.uid
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