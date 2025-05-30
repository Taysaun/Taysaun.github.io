const crypto = require('crypto');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db', (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});


function getLogin(req, res) {
    res.render('login');
}

function postLogin(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username, password)
    
    if (username && password) {
        db.get("SELECT * FROM users WHERE username=?;", username, (err, row) => {
            if (err) {
                console.error(err)
                res.send("There was an error:\n" + err)
            } else if (!row) {
                //create a new salt for this user
                const salt = crypto.randomBytes(16).toString('hex')
                //Use the salt to hash the password
                crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
                    if (err) {
                        res.send("Error hashing password: " + err)
                    } else {
                        const hashedPassword = derivedKey.toString('hex')
                        db.run('INSERT INTO users(username, password, salt) VALUES(?, ?, ?);', [username, hashedPassword, salt], (err) => {
                            if (err) {
                                res.send("Database error: \n" + err)
                            } else {
                                res.redirect('/')
                            }
                        })
                    }
                })
            } else if (row) {
                //compare stored password with provided password
                crypto.pbkdf2(password, row.salt, 1000, 64, "sha512", (err, derivedKey) => {
                    if (err) {
                        res.send("Error Hashing Password")
                    } else {
                        const hashedPassword = derivedKey.toString('hex')
                        if (row.password === hashedPassword) {
                            req.session.user = username;
                            res.redirect('/')
                        } else {
                            res.send("Incorrect password")
                        }
                    }
                })
                
            }
        })
    } else {
        res.send("You need a username and password")
    }
}

function getRoot(req, res) {
    console.log(req.session.user)
    res.render('index', {user: req.session.user});
}

function logout(req, res) {
    req.session.destroy();
    res.redirect('/');
}

function chat(req, res) {
    res.render('chat');
}

function isAuthenticated() {

}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    logout,
    chat
}