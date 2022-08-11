import axios from 'axios';

async function createUser (data) {
  return axios.post('/signup', {
  })
};

async function logIn (data) {
  return axios.post('/login', {
  })
};

async function logOut (data) {
  return axios.post('/logout', {
  })
};

async function createDungeon (user) {
  return axios.post('/dungeons', {
  })
};

async function updateDungeon (data, user) {
  return axios.patch('/dungeons', {
  })
};

async function getDungeons (user) {
  return axios.get('/dungeons', {
  })
};

async function getSounds (query) {
  return axios.get('/sounds', {
  })
};

export {
  createUser,
  logUser,
  createDungeon,
  updateDungeon,
  getDungeons,
  getSounds
};