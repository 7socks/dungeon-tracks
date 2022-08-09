import React from 'react';

const AudioContext = React.createContext({
  currentPlaylist: null,
  currentTrack: null,
  currentEffect: null,

  setPlaylist: (playlist) => {

  },

  setTrack: (track) => {

  },

  playTrack: () => {

  }

});

export default AudioContext;