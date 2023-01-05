const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;


const app = express();


app.use(express.static('public'));


//gets route for homepage index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  //gets rout for notes page
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

//we want the app to listen
  app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
