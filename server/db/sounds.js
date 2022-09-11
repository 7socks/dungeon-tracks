const db = require('./index.js');

module.exports.getFX = async (query) => {
  return db.MATCH('effects', {
    keys: ['title', 'source', 'id'],
    params: ['title'],
    values: [query]
  })
    .then(([res]) => res)
};

module.exports.getTracks = async (query) => {
  return db.MATCH('tracks', {
    keys: ['title, source', 'id'],
    params: ['title'],
    values: [query]
  })
    .then(([res]) => res)
};