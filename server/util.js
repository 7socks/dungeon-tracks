module.exports.genPlaylist = (list) => {
  list.sort((a, b) => {
    if (a.position < b.position) {
      return -1;
    } else if (a.position > b.position) {
      return 1;
    } else {
      return 0;
    }
  });

  let playlist = list.map((track) => {
    if (track.icon && track.color) {
      return {
        id: track._id,
        title: track.title,
        icon: track.icon,
        color: track.color,
        sound_id: track.effect_id || track.track_id
      };
    } else {
      return {
        id: track.id,
        title: track.title,
        sound_id: track.effect_id || track.track_id
      };
    }
  })

  return playlist;

  // Linked list version //
  for (let i = 0; i < list.length; i++) {
    if (i > 0) {
      playlist[i].prev = playlist[i - 1];
    }
    if (i < list.length - 1) {
      playlist[i].next = playlist[i + 1];
    }
  }

  return playlist[0];
};


module.exports.checkSession = (req, res, next) => {
  if (req.userId === null) {
    res.status(401).send();
  } else {
    next();
  }
};