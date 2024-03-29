const path = require('path');
const express = require('express');
const db = require('./db/index');
const { matchUser, createUser, logIn, logOut } = require('./db/users');
const { getFX, getTracks } = require('./db/sounds');
const Dungeon = require('./db/dungeon');
const { genPlaylist, checkSession } = require('./util');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));


// !! Artificial response delay (for testing loader wheel)
// app.use((req, res, next) => {
//   setTimeout(() => {
//     next();
//   }, 3000);
// });



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
});

// Search sound library
app.get('/sounds', (req, res) => {
  const responseData = {};
  getTracks(req.query.s)
    .then((data) => {
      responseData.tracks = data;
      return getFX(req.query.s);
    })
    .then((data) => {
      responseData.fx = data;
      res.status(200).send(responseData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
});

// Request dungeon list
app.get('/dungeons', checkSession, (req, res) => {
  Dungeon.list(req.userId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(400).send();
    })
});

// Request dungeon data
app.get('/dungeon', checkSession, (req, res) => {
  Dungeon.get(req.userId, Number(req.query.id))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send();
    })
});

// Create new dungeon
app.post('/dungeons', checkSession, (req, res) => {
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
app.patch('/dungeon', checkSession, (req, res) => {
  Dungeon.get(req.userId, Number(req.body.id))
    .then(() => {
      if (req.body.key === 'title') {
        return Dungeon.updateTitle(req.userId, req.body.id, req.body.payload)
      } else if ((['tracks', 'effects']).includes(req.body.key)) {
        return Dungeon.updatePlaylist(req.body.id, req.body.payload, req.body.key)
      } else {
        throw new Error('Invalid property key');
      }
    })
    .then(() => {
      return Dungeon.get(req.userId, Number(req.body.id))
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send();
    })
});

// Add fx or track to a dungeon
app.post('/dungeon_playlist', checkSession, (req, res) => {
  let playlist = req.body.type;
  Dungeon.get(req.userId, Number(req.body.dungeonId))
    .then((data) => {
      let key = playlist.slice(0, playlist.length - 1) + '_id';
      let ids = data[req.body.type].map((item) => item[key]);
      if (!ids.includes(req.body.soundId)) {
        return Dungeon.addToPlaylist(req.body)
      }
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send();
    })
});

// Remove track/fx from a dungeon
app.delete('/dungeon_playlist', checkSession, (req, res) => {
  Dungeon.get(req.userId, Number(req.body.dungeonId))
    .then(() => {
      return Dungeon.removeFromPlaylist(req.body)
    })
    .then(() => {
      return Dungeon.get(req.userId, Number(req.body.dungeonId))
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send();
    })
});

// Delete dungeon
app.delete('/dungeon', checkSession, (req, res) => {
  Dungeon.get(req.userId, Number(req.body.id))
    .then(() => {
      return Dungeon.delete(req.userId, Number(req.body.id))
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
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