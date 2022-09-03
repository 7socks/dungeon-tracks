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
  return axios.patch('/dungeon', data)
    .then((res) => res.data)
    .catch(() => console.log('failure'))
}

async function addSoundToDungeon (data) {
  return axios.post('/dungeon_sounds', data)
    .then((res) => res.data)
};

async function getDungeons () {
  return axios.get('/dungeons')
    .then((res) => res.data)
}

async function getDungeon (id) {
  return axios({
    url: '/dungeon',
    method: 'get',
    params: {id}
  })
    .then((res) => res.data)
}

async function deleteDungeon (id) {
  return axios({
    url: '/dungeon',
    method: 'delete',
    data: {id}
  })
}

async function getSounds (s) {
  return axios({
    url: '/sounds',
    method: 'get',
    params: {s}
  })
    .then((res) => res.data)
}

export default {
  createUser,
  logIn,
  logOut,
  createDungeon,
  updateDungeon,
  getDungeons,
  getDungeon,
  deleteDungeon,
  addSoundToDungeon,
  getSounds
};