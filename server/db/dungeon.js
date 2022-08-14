const db = require('./index');

const orderList = (list) => {
  list.sort((a, b) => {
    if (a.position > b.position) {
      return 1;
    } else if (a.position < b.position) {
      return -1;
    } else {
      return 0;
    }
  });
  return list;
};

module.exports.list = async (userId) => {
  return db.GET('dungeons', {
    keys: ['id', 'title'],
    params: ['user'],
    values: [userId]
  })
    .then(([res]) => {
      return res;
    })
};

module.exports.getTracks = async (dungeonId) => {
  return db.GET('dungeons_tracks', {
    keys: ['*'],
    params: ['dungeon_id'],
    values: [dungeonId]
  })
    .then(([res]) => {
      return orderList(res);
    })
};

module.exports.getEffects = async (dungeonId) => {
  return db.GET('dungeons_effects', {
    keys: ['*'],
    params: ['dungeon_id'],
    values: [dungeonId]
  })
    .then(([res]) => {
      return orderList(res);
    })
};

module.exports.create = async (userId, data) => {
  data.user = userId;
  return db.POST('dungeons', data)
};

module.exports.update = async (dungeonId, data) => {
  let keys = Object.keys(data);
  let values = keys.map((key) => data[key]);
  return db.UPDATE('dungeons', {
    params: ['dungeon_id'],
    values: [dungeonId]
  }, {keys, values})
};