//importing 'express' module
const express = require('express');
//make new express app
const app = express()

//Create GET endpoint for the ROOT
app.get('/', (req, res) => {
    res.send("Hello, world!")
});

//Create example endpoints

app.get('/branch/1', (req, res) => {
    res.send("leaf (endpoint) 1");
});
app.get('/branch/2', (req, res) => {
    res.send("leaf (endpoint) 2");
});
app.get('/joke', (req, res) => {
    res.send("I had old spaghetti last night. It was kinda sauce");
});

//in terminal, get your IP with 'ipconfig'
//have a friend connect to /joke
//http://172.16.3.159:3000/joke
//172.16.3.135

//CONSTANTS
const PORT = 2500;

//Start an HTTP Listen Server with Express
app.listen(PORT, (error)=>{
    console.log(`Server started on port ${PORT}`)
});

