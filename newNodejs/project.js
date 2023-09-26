var express = require('express')
var app = express()

const PORT = 500

app.listen(PORT, (error)=>{
    console.log(`Listening on port ${PORT}`)
})

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('pages/index')
});

app.get('/mysite', (req, res)=>{
    var name = 'Guest'
    
});