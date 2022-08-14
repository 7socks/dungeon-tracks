const { v4: uuidv4 } = require('uuid');
const db = require('../db/index');

module.exports.create = async (userId) => {
  let cookie = uuidv4();
  return db.POST('user_sessions', {
    user: userId,
    cookie: cookie
  })
    .then(() => {
      return cookie;
    })
};