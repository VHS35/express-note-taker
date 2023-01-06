const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoutes')
const app = express();

//middleware
app.use(express.static('public'));
app.use('/api', apiRoutes);
//middleware that access the data from the request body 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//gets route for homepage index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  //gets route for notes page
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

// code for the app to listen to server
  app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
