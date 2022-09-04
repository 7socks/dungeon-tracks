import { Howl, Howler } from 'howler';
import AudioFX from 'audiofx';

const Audio = {
  queue: [],
  queueIndex: 0,
  track: null,
  fx: null,
  sample: null,
  muffled: false
};

Audio.playTrack = (src, callback, autoplay = true) => {
  Audio.sample && Audio.sample.stop();
  Audio.track && Audio.track.unload();

  Audio.track = new Howl({
    src: [src],
    autoplay: autoplay,
    html5: true
  });

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
  let autoplay = Audio.track && Audio.track.playing();
  if (Audio.queueIndex > 0) {
    Audio.queueIndex -= 1;
    Audio.playTrack(Audio.queue[Audio.queueIndex], callback, autoplay);
  }
};

Audio.skipForward = (callback) => {
  let autoplay = Audio.track && Audio.track.playing();
  if (Audio.queueIndex < Audio.queue.length - 1) {
    Audio.queueIndex += 1;
    Audio.playTrack(Audio.queue[Audio.queueIndex], callback, autoplay);
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

Audio.muffle = () => {
  // if (Audio.muffled) {
  //   Audio.track.filter(1, null);
  // } else {
  //   Audio.track.filter(.5, null);
  // }
  // Audio.muffled = !Audio.muffled;
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