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
      return getPlaylist(dungeonId, 'tracks');
    })
    .then((tracks) => {
      output.tracks = tracks;
      return getPlaylist(dungeonId, 'effects');
    })
    .then((effects) => {
      output.effects = effects;
      return output;
    })
};

module.exports.create = async (userId, data) => {
  data.user = userId;
  return db.POST('dungeons', data)
};

module.exports.delete = async (userId, dungeonId) => {
  return db.DELETE('dungeons_tracks', {
    params: ['dungeon_id'],
    values: [dungeonId]
  })
    .then(() => {
      return db.DELETE('dungeons_effects', {
        params: ['dungeon_id'],
        values: [dungeonId]
      })
    })
    .then(() => {
      return db.DELETE('dungeons', {
        params: ['user', 'id'],
        values: [userId, dungeonId]
      })
    })
};

module.exports.updateTitle = async (userId, dungeonId, title) => {
  if (title === undefined) return null;
  return db.PATCH('dungeons', {
    params: ['id', 'user'],
    values: [dungeonId, userId]
  }, {
    key: 'title',
    value: title
  })
};

module.exports.updateTracks = async (dungeonId, data) => {
  return updatePlaylist(dungeonId, data, 'tracks');
};


module.exports.updateEffects = async (dungeonId, data) => {
  return updatePlaylist(dungeonId, data, 'effects');
};

module.exports.updatePlaylist = async (dungeonId, data, playlist) => {

  // From linked list
  // let ids = [data.id];
  // let item = data;
  // while (item.next) {
  //   ids.push(data.next.id);
  //   item = data.next;
  // }

  // From array
  // let ids = data.map((item) => {
  //   return item.id;
  // });

  return Promise.all(data.map((item, i) => {
    return db.PATCH('dungeons_' + playlist, {
      params: ['dungeon_id', 'id'],
      values: [dungeonId, item.id]
    }, {
      key: 'position',
      value: i
    })
    .then((res) => {
      if (playlist === 'tracks') return;

      return db.PATCH('dungeons_' + playlist, {
        params: ['dungeon_id', 'id'],
        values: [dungeonId, item.id]
      }, {
        key: 'icon',
        value: item.icon
      })
    })
    .then(() => {
      if (playlist === 'tracks') return;

      return db.PATCH('dungeons_' + playlist, {
        params: ['dungeon_id', 'id'],
        values: [dungeonId, item.id]
      }, {
        key: 'color',
        value: item.color
      })
    })
  }))
};

module.exports.addToPlaylist = async ({dungeonId, soundId, type}) => {
  let soundIdKey = type.slice(0, type.length - 1) + '_id';
  return db.POST('dungeons_' + type, {
    dungeon_id: dungeonId,
    [soundIdKey]: soundId
  })
};

const getPlaylist = async (dungeonId, playlist) => {
  let singular = playlist.slice(0, playlist.length - 1);
  return db.GET('dungeons_' + playlist, {
    keys: ['*'],
    params: ['dungeon_id'],
    values: [dungeonId]
  })
    .then(([res]) => {
      let tracks = orderList(res);
      return Promise.all(tracks.map((track) => {
        return db.GET(playlist, {
          keys: ['title', 'source'],
          params: ['id'],
          values: [track[singular + '_id']]
        })
          .then(([res]) => {
            track.title = res[0].title;
            track.source = res[0].source;

            delete track.dungeon_id;
            //delete track[singular + '_id'];
            return track;
          })
      }))
    })
};