const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.generate = async function (password) {
  return bcrypt.hash(password, saltRounds)
    .then((hash) => hash)
}

module.exports.login = async function (attempt, hash) {
  return bcrypt.compare(attempt, hash)
    .then((res) => res)
}