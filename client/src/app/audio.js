import { Howl, Howler } from 'howler';
import AudioFX from 'audiofx';

const Audio = {
  queue: [],
  queueIndex: 0,
  track: null,
  fx: null,
  sample: null,
  volume: 1,
  muted: false,
  muffled: false,
  muffleTrack: null
};

Audio.playTrack = (src, callback, autoplay = true) => {
  Audio.sample && Audio.sample.stop();
  Audio.track && Audio.track.unload();
  Audio.muffleTrack && Audio.muffleTrack.remove();

  Audio.track = new Howl({
    src: [src],
    autoplay: Audio.muffled ? false : autoplay,
    html5: true
  });

  if (Audio.muffled) {
    Audio.track.mute(true);
  }

  Audio.muffleTrack = new AudioFX(src, () => {
    Audio.muffleTrack.filter(.5, 0);
    Audio.muffleTrack.volume(Audio.muted ? 0 : Audio.volume / 2);
    if (Audio.muffled && autoplay) {
      Audio.track.play();
      Audio.muffleTrack.play();
    }
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

Audio.refreshQueue = (tracks, index) => {
  let currentTrack = Audio.queue[Audio.queueIndex];
  Audio.queue = tracks.map((track) => track.source);
  Audio.queueIndex = index;
;}

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
  if (Audio.muffled) {
    Audio.muffleTrack && Audio.muffleTrack.pause();
    Audio.track && Audio.track.pause();
  } else {
    Audio.track && Audio.track.pause();
  }
};

Audio.resume = () => {
  if (Audio.muffled) {
    Audio.muffleTrack && Audio.muffleTrack.play(Audio.track.seek())
    Audio.track && Audio.track.play();
  } else {
    Audio.track && Audio.track.play();
  }
};

Audio.clear = () => {
  Audio.track && Audio.track.unload();
  Audio.track = null;
  Audio.queue = [];
  Audio.queueIndex = 0;
}

Audio.setVolume = (volume) => {
  Howler.volume(volume);
  Audio.volume = volume;
  if (!Audio.muted && Audio.muffleTrack) {
    AudioFXGlobal.changeVolumeAll(volume / 2);
  }
};

Audio.mute = (state) => {
  Howler.mute(state);
  Audio.muted = state;
  Audio.muffleTrack && AudioFXGlobal.changeVolumeAll(state ? 0 : Audio.volume);
};

Audio.muffle = () => {
  Audio.muffled = !Audio.muffled;
  if (Audio.track) {
    if (Audio.muffled) {
      Audio.track.mute(true);
      if (Audio.track.playing()) {
        Audio.muffleTrack.play(Audio.track.seek())
      }
    } else {
      Audio.muffleTrack.pause();
      Audio.track.mute(false);
    }
  }
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

Audio.playSample = (src, callback) => {
  Audio.sample && Audio.sample.unload();
  Audio.sample = new Howl({src: [src]});

  Audio.track && Audio.track.pause();

  Audio.sample.play();
  Audio.sample.on('end', callback);
};

Audio.stopSample = () => {
  Audio.sample && Audio.sample.stop();
}

export default Audio;