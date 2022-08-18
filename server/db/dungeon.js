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

module.exports.get = async (userId, dungeonId) => {
  let output = {};
  return db.GET('dungeons', {
    keys: ['id', 'title'],
    params: ['user', 'id'],
    values: [userId, dungeonId]
  })
    .then(([res]) => {
      if (res.length === 0) {
        throw new Error('No match found for user and dungeon IDs');
      } else {
        output.id = res[0].id;
        output.title = res[0].title;
      }
    })
    .then(() => {
      return getTracks(dungeonId);
    })
    .then((tracks) => {
      output.tracks = tracks;
      return getEffects(dungeonId);
    })
    .then((effects) => {
      output.effects = effects;
      return output;
    })
}

module.exports.create = async (userId, data) => {
  data.user = userId;
  return db.POST('dungeons', data)
};

module.exports.updateTitle = async (userId, dungeonId, title) => {
  return db.PATCH('dungeons', {
    params: ['id', 'user'],
    values: [dungeonId, userId]
  }, {
    key: 'title',
    value: title
  })
};

const getTracks = async (dungeonId) => {
  return db.GET('dungeons_tracks', {
    keys: ['*'],
    params: ['dungeon_id'],
    values: [dungeonId]
  })
    .then(([res]) => {
      return orderList(res);
    })
};

const getEffects = async (dungeonId) => {
  return db.GET('dungeons_effects', {
    keys: ['*'],
    params: ['dungeon_id'],
    values: [dungeonId]
  })
    .then(([res]) => {
      return orderList(res);
    })
};