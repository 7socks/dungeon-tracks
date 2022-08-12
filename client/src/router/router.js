import axios from 'axios';

async function createUser (data) {
  return axios.post('/signup', data)
    .then(() => {
      console.log('Signup success')
    })
    .catch(() => {
      console.log('Signup failed')
    })
}

async function logIn (data) {
  return axios.post('/login', {
    data: data
  })
    .then((res) => {
    })
    .catch(() => {
    })
}

async function logOut (data) {
  return axios.post('/logout', {
  })
}

async function createDungeon (user) {
  return axios.post('/dungeons', {
  })
}

async function updateDungeon (data, user) {
  return axios.patch('/dungeons', {
  })
    .then((res) => {

    })
    .catch(() => {

    })
}

async function getDungeons (user) {
  return axios.get('/dungeons', {
  })
}

async function getSounds (query) {
  return axios.get('/sounds', {
  })
}

export {
  createUser,
  logIn,
  logOut,
  createDungeon,
  updateDungeon,
  getDungeons,
  getSounds
};