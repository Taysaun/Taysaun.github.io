//importing 'express' module
const express = require('express');
//make new express app
const app = express()

//Create GET endpoint for the ROOT
app.get('/', (req, res) => {
    res.send("Hello, world!")
});

//CONSTANTS
const PORT = 3000;

//Start an HTTP Listen Server with Express
app.listen(PORT, (error)=>{
    console.log(`Server started on port ${PORT}`)
});