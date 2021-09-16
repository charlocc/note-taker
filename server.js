const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

const app = express();
const PORT = process.env.PORT || 3001;


//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));




// route to notes.html page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
); 

// route to index.html page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
); 

// GET Route for retrieving notes
app.get('/', (req, res) =>
  readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
app.post('/', (req, res) => {
    const { title, noteText } = req.body;
  
    // If all the required properties are present, create new note and append to the db.json
    if (title && noteText) {
      const newNote = {
        title,
        noteText,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
  });


// Host port
app.listen(PORT, ()=>
    console.log(`App listening at http://localhost:${PORT}`)
);