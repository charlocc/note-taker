const express = require('express');
const path = require('path');
const fs = require('fs');
const uuidv4  = require('./helpers/uuid');
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');

const app = express();
const PORT = process.env.PORT || 3001;


//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


// HTML ROUTES 

// route to notes.html page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
); 

// route to index.html page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
); 

// APP ROUTES 

// GET Route for retrieving notes
app.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
  
    // If all the required properties are present, create new note and append to the db.json
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'Successfully posted note',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });

// DELETE route for deleting notes
// app.delete('/api/notes/:id', (req, res) => {
//   const deletedNoteId = req.params.id;
//   readFromFile('./db/db.json')
//   .then
// })

// Host port
app.listen(PORT, ()=>
    console.log(`App listening at http://localhost:${PORT}`)
);