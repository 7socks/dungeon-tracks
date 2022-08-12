import { Howl, Howler } from 'howler';

const Audio = {
  queue: [],
  queueIndex: 0,
  track: null,
  fx: null
};

Audio.playTrack = (src, callback) => {
  Audio.track && Audio.track.unload();

  Audio.track = new Howl({ src: [src] });
  Audio.track.play();

  if (Audio.queueIndex < Audio.queue.length - 1) {
    Audio.track.on('end', () => {
      Audio.queueIndex += 1;
      Audio.playTrack(Audio.queue[Audio.queueIndex], callback);
      callback(Audio.queueIndex);
    });
  }
};

Audio.playQueue = (tracks, index, callback) => {
  Audio.queue = tracks.map((track) => track.source);
  Audio.queueIndex = 0;
  Audio.playTrack(Audio.queue[0], callback);
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

export default Audio;