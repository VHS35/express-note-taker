
const fs = require('fs');
const uuid = require('uuid');//npm uuid gives notes unique id 
const router = require('express').Router();


//mini project helper code
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helperCode/fsUtils');

//set up router to read file and content to db.json file
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// POST Route for a new note
router.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid.v4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note created!`);
    } else {
      res.error('Error in creating note');
    }
});

// DELETE Route for a specific note
router.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Makes a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Saves that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Response to the DELETE request
        res.json("Note has been deleted");
    });
});

module.exports = router;