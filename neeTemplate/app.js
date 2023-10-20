/* 
Nee Template
by Taysaun Johnson

In case I forget how to make a nodejs, expressjs, ejs stack https server application.
*/

//Import modules
const express = require('express');
const bodyParser = require('body-parser')
//Constants
const PORT = 3000
//SETUP
const app = express()
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
// Tell express to use ejs
app.set('view engine', 'ejs')
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

//ROOT ENDPOINT
app.get('/', (req, res) => {
    //SEND a RESponse that is a FILE
    res.sendFile('/public/index.html')
});
// This GET endpoint returns an ejs template with data
app.get('/form', (req, res) => {
    res.render('form', {phrase: "Fill out this form, please"})
});

app.post('/submit', (req, res) => {
    //check the incoming form data
    let imgSrc = ''
    if (req.body.userCheck) {
        imgSrc = 'gigaNerdNeck.jfif'
    }
    res.render('form', {phrase: 'Thanks!', imgToDisplay: imgSrc})
});