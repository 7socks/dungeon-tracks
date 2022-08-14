const path = require('path');
const express = require('express');
const db = require('./db/index');
const { matchUser, createUser, logIn, logOut } = require('./db/users');
const Dungeon = require('./db/dungeon');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

// Validate user session from xsrf token
app.use((req, res, next) => {
  let cookie = req.get('x-xsrf-token');
  if (cookie) {
    matchUser(cookie)
      .then((userId) => {
        req.userId = userId;
        next();
      })
  } else {
    req.userId = null;
    next();
  }
})

// Search sound library
app.get('/sounds', (req, res) => {
});

// Request dungeon list
app.get('/dungeons', (req, res) => {
  Dungeon.list(req.userId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(401).send();
    })
});

// Create new dungeon
app.post('/dungeons', (req, res) => {
  Dungeon.create(req.userId, req.body)
    .then(() => {
      return Dungeon.list(req.userId)
    })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send();
    })
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
      res.status(400).send();
    })
});

// Request logout
app.post('/logout', (req, res) => {
  let cookie = req.get('x-xsrf-token');
  logOut(cookie)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(500).send();
    })
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