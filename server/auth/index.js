const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.generate = async function (text) {
  return bcrypt.hash(text, saltRounds)
    .then((hash) => hash)
}

module.exports.match = async function (attempt, hash) {
  return bcrypt.compare(attempt, hash)
    .then((res) => res)
}