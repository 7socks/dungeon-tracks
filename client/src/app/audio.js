import { Howl, Howler } from 'howler';

const Audio = {
  queue: [],
  track: null,
  fx: null
};

Audio.playTrack = (src, callback) => {
  Audio.track && Audio.track.unload();

  Audio.track = new Howl({ src: [src] });
  Audio.track.play();

  if (Audio.queue.length > 0) {
    Audio.track.on('end', () => {
      Audio.playTrack(Audio.queue.shift(), callback);
      callback();
    });
  }
};

Audio.playQueue = (tracks, callback) => {
  Audio.queue = tracks.map((track) => track.source);
  let firstTrack = Audio.queue.shift();
  Audio.playTrack(firstTrack, callback);
};

Audio.pause = () => {
  Audio.track && Audio.track.pause();
};

Audio.playFX = (src, callback) => {
  Audio.fx && Audio.fx.unload();

  Audio.fx = new Howl({ src: [src] });
  Audio.fx.once('load', () => {
    Audio.fx.play();
  });

  Audio.fx.on('end', callback);
};

Audio.setVolume = (volume) => {
  Howler.setVolume(volume);
};

Audio.resume = () => {
  Audio.track && Audio.track.play();
}

export default Audio;