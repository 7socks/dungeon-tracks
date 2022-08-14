const Auth = require('../auth/index');
const Session = require('../auth/sessions');
const db = require('./index');

module.exports.createUser = async (username, password) => {
  return Auth.generate(password)
    .then((hash) => {
      console.log('Hash length:', hash.length);
      return db.POST('users', {
        user: username,
        hashkey: hash
      });
    })
    .then(([data]) => {
      console.log('created:', data);
      return db.GET('users', {
        keys: ['id'],
        params: ['user'],
        values: ['username']
      })
    })
    .then(([data]) => {
      return Session.create(data[0].id);
    })
};

module.exports.logIn = async (username, password) => {
  return db.GET('users', {
    keys: ['hashkey', 'id'],
    params: ['user'],
    values: [username]
  })
    .then(([data]) => {
      let res = data[0];
      if (res && Auth.match(password, res.hashkey)) {
        return Session.create(res.id);
      } else {
        throw new Error('Invalid credentials');
      }
    })
};

module.exports.logOut = async (cookie) => {
  return db.DELETE('user_sessions', {
    params: ['cookie'],
    values: [cookie]
  })
};

module.exports.matchUser = async (cookie) => {
  return db.GET('user_sessions', {
    keys: ['user'],
    params: ['cookie'],
    values: [cookie]
  })
    .then(([data]) => {
      return data[0].user;
    })
};