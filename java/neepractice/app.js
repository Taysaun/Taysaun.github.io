//Import Modules
const express  = require('express')

const bodyParser = require('body-parser');

//Create a new expressJS server
const app = express()
//Tell express to use the body parser to sead Post
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    var userName = 'Guest'
    if (req.query.name){
        userName = req.query.name;
    }
    res.send(`<h1>Hello, ${userName}!</h1>`)
})  
app.get('/submit', (req, res) => {
    res.sendFile(__dirname+'/form.html')
})
app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send(`God data ${req.body.age}, ${req.body.old}`)
})
app.listen(3000, (err) => {
    //error validation
    if (err){
        console.log(err)
    } else {
        console.log('Server is running on port 3000')
    }
})