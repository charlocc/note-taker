const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();


//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express)

// route to index.html page
// route to notes.html pagenotes

app.listen(PORT, ()=>
    console.log('App listneing')
);