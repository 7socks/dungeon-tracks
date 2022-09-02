import { Howl, Howler } from 'howler';

const Audio = {
  queue: [],
  queueIndex: 0,
  track: null,
  fx: null,
  sample: null
};

Audio.playTrack = (src, callback) => {
  Audio.sample && Audio.sample.stop();
  Audio.track && Audio.track.unload();

  Audio.track = new Howl({ src: [src] });
  Audio.track.play();

  if (Audio.queueIndex < Audio.queue.length - 1) {
    Audio.track.on('end', () => {
      Audio.queueIndex += 1;
      callback(Audio.queueIndex);
      Audio.playTrack(Audio.queue[Audio.queueIndex], callback);
    });
  }
};

Audio.playQueue = (tracks, index = 0, callback) => {
  Audio.queue = tracks.map((track) => track.source);
  Audio.queueIndex = index;
  Audio.playTrack(Audio.queue[index], callback);
};

Audio.skipBack = (callback) => {
  if (Audio.queueIndex > 0) {
    Audio.queueIndex -= 1;
    Audio.playTrack(Audio.queue[Audio.queueIndex], callback);
  }
};

Audio.skipForward = (callback) => {
  if (Audio.queueIndex < Audio.queue.length - 1) {
    Audio.queueIndex += 1;
    Audio.playTrack(Audio.queue[Audio.queueIndex], callback);
  }
};

Audio.playFX = (src, callback) => {
  Audio.sample && Audio.sample.stop();
  Audio.fx && Audio.fx.unload();

  Audio.fx = new Howl({ src: [src] });
  Audio.fx.once('load', () => {
    Audio.fx.play();
  });

  Audio.fx.on('end', callback);
};

Audio.pause = () => {
  Audio.track && Audio.track.pause();
};

Audio.resume = () => {
  Audio.track && Audio.track.play();
};

Audio.setVolume = (volume) => {
  Howler.volume(volume);
};

Audio.mute = (state) => {
  Howler.mute(state);
};

Audio.duration = (track) => {
};

Audio.timecode = () => {
  if (Audio.track) {
    return Audio.track.seek();
  } else {
    return null;
  }
};

Audio.playSample = (src) => {
  Audio.sample && Audio.sample.unload();
  Audio.sample = new Howl({src: [src]});

  Audio.track && Audio.track.pause();

  Audio.sample.play();
};

Audio.stopSample = () => {
  Audio.sample && Audio.sample.stop();
}

export default Audio;