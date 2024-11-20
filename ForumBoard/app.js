const express = require('express')
const sqlite3 = require('sqlite3')
const jwt = require('jsonwebtoken');
const session = require('express-session');
const app = express()

app.use(express.urlencoded({extended: true}))

const FBJS_URL = 'http://172.16.3.100:420/oauth'; // ... or the address to the instance of fbjs you wish to connect to
const THIS_URL = 'http://localhost:3000/login'; // ... or whatever the address to your application is

app.use(session({
    secret: 'Cosmic Brownies are good af',
    resave: false,
    saveUninitialized: false
}))

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
};

const db = new sqlite3.Database('data.db', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('database is working')
    }
})

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    if (req.query.token) {
        let tokenData = jwt.decode(req.query.token);
        console.log(tokenData)
        req.session.token = tokenData;
        req.session.user = tokenData.username;
        db.get('SELECT * FROM users WHERE fb_name = ? AND fb_id = ?', [req.session.user, req.session.token.id], (err, row) => {
            if (err) {
                console.log(err)
            } else if (!row) {
                db.run('INSERT INTO users(fb_name , fb_id) VALUES(?, ?)', [req.session.user, req.session.token.id], (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                res.redirect('/conversations');
            } else {
                res.redirect('/conversations');
            }
        })
    } else if (req.session.user) {
        res.redirect('/conversations')
    } else {
        res.redirect(`${FBJS_URL}?redirectURL=${THIS_URL}`);
    };
});

app.get('/conversations', isAuthenticated, (req, res) => {
    db.all('SELECT * FROM conversations', (err, row) => {
        if (err) {
            console.log(err)
        } else if (row) {
            let conversations = {};
            row.forEach(con => {
                conversations[con.name] = {
                    uid: con.uid,
                    posterId: con.posterId
                }
            })
            console.log(conversations)
            try {
                res.render('conversations', { 
                    conversations: conversations,
                    user: req.session.user
                })
            }
            catch (error) {
                res.send(error.message)
            }
        }
    })
})

app.get('/conversation/:id', isAuthenticated, (req, res) => {
    // let conversation = req.params['id']
    db.all('SELECT * FROM content WHERE conversationid = ?', req.params['id'], (err, row) => {
        if (err) {
            console.log(err)
        } else if (row) {
            console.log(row)
            res.render('conversation', {conversation: row})
        }
    })
})

app.get('/newConversation', isAuthenticated, (req, res) => {
    res.render('newConversation')
})

app.post('/newConversation', (req, res) => {
    let newCon = req.body.convoName
    db.get('SELECT * FROM users WHERE fb_name = ?', req.session.user, (err, row) => {
        if (err) {
            console.log(err)
        } else if(row) {
            console.log(row)
            db.run('INSERT INTO conversations(name, posterId) VALUES(?, ?);', [newCon, row.uid])
            res.redirect('/conversations')
        }
    })
})



app.listen(3000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('server running on port 3000')
    }
})