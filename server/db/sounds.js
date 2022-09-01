const db = require('./index.js');

const genRegEx = (term) => {
  return new RegExp(term, 'ig');
}

module.exports.getFX = async (query) => {
  return db.MATCH('effects', {
    keys: ['title', 'source'],
    params: ['title'],
    values: [genRegEX(query)]
  })
    .then(([res]) => res)
};

module.exports.getTracks = async (query) => {
  return db.MATCH('tracks', {
    keys: ['title, source'],
    params: ['title'],
    values: [query]
  })
    .then(([res]) => res)
};