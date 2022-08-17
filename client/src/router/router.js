import axios from 'axios';

async function createUser (data) {
  return axios.post('/signup', data)
    .then(() => {return true})
    .catch(() => {return false})
}

async function logIn (data) {
  return axios.post('/login', data)
    .then(() => {return true})
    .catch(() => {return false})
}

async function logOut (data) {
  return axios.post('/logout', {
  })
}

async function createDungeon (data) {
  return axios.post('/dungeons', data)
    .then((res) => res.data)
}

async function updateDungeon (data) {
  return axios.patch('/dungeons', data)
    .then((res) => {

    })
    .catch(() => {

    })
}

async function getDungeons () {
  return axios.get('/dungeons')
    .then((res) => res.data)
}

async function getDungeon (id) {
  return axios({
    url: '/dungeon',
    params: {id}
  })
    .then((res) => res.data)
}

async function getSounds (query) {
  return axios.get('/sounds', {
  })
}

export default {
  createUser,
  logIn,
  logOut,
  createDungeon,
  updateDungeon,
  getDungeons,
  getDungeon,
  getSounds
};