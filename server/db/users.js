const Auth = require('../auth/index');
const db = require('./index');

module.exports.createUser = async (username, password) => {
  return Auth.generate(password)
    .then((hash) => {
      return db.POST('users', {
        user: username,
        hashkey: hash
      });
    })
};

module.exports.logIn = async (username, password) => {
  return db.GET('users', {
    keys: ['hashkey']
    params: ['username'],
    values: [username]
  })
    .then((res) => {
      return res && Auth.login(password, res[0]);
    })
    .then((success) => {
      if (success) {
        // create session
      }
    })
};

module.exports.logOut = async (token) => {
  // delete stored session data
};