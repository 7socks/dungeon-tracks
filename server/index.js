const path = require('path');
const express = require('express');
const db = require('./db/index');
const { createUser, logIn, logOut } = require('./db/users');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

// Search sound library
app.get('/sounds', (req, res) => {
});

// Request dungeon list
app.get('/dungeons', (req, res) => {
});

// Create new dungeon
app.post('/dungeons', (req, res) => {
});

// Edit existing dungeon
app.patch('/dungeons', (req, res) => {
});

// Request login
app.post('/login', (req, res) => {
  let { username, password } = req.body;
  logIn(username, password)
    .then((cookie) => {
      res.status(200).cookie('XSRF-TOKEN', cookie).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
});

// Request logout
app.post('/logout', (req, res) => {
});

// Request sign up (create user)
app.post('/signup', (req, res) => {
  let { username, password } = req.body;
  createUser(username, password)
    .then((cookie) => {
      res.status(201).cookie('XSRF-TOKEN', cookie).send();
    })
    .catch((err) => {
      res.status(400).send();
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
  db.init();
});