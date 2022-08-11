import { createSlice } from '@reduxjs/toolkit';

const example = {
  id: "123456789",
  title: "Dragon Lair",
  tracks: [
    {
      title: "In the Hall of the Mountain King",
      source: "",
      index: 0
    },
    {
      title: "SAIL",
      source: "",
      index: 1
    },
    {
      title: "Clash vx80 - Remix",
      source: "",
      index: 2
    }
  ],
  effects: [
    {
      title: "Roar",
      source: "",
      icon: "dragon",
      color: "green",
      index: 0
    },
    {
      title: "Falling Treasure",
      source: "",
      icon: "music",
      color: "orange",
      index: 1
    },
    {
      title: "Fireball",
      source: "temp/fireball.wav",
      icon: "flame",
      color: "red",
      index: 2
    }
  ],
  creator: "dev",
  cover: ""
};

export const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    dungeon: example,
    track: 0,
    effect: null,
    playing: false,
    volume: 1.0,
    muted: false,
    muffled: false
  },
  reducers: {
    setDungeon: (state, action) => {
      state.dungeon = action.payload;
    },
    setTrack: (state, action) => {
      state.track = action.payload;
    },
    trackForward: (state) => {
      if (state.track + 1 < state.dungeon.tracks.length) {
        state.track += 1;
      }
    },
    trackBackward: (state) => {
      if (state.track - 1 >= 0) {
        state.track -= 1;
      }
    },
    playPause: (state) => {
      state.playing = !state.playing;
    },
    mute: (state) => {
      state.muted = !state.muted;
    },
    muffle: (state) => {
      state.muffled = !state.muffled;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    playFX: (state, action) => {
      state.effect = action.payload;
    }
  }
});

export const {
  setDungeon,
  setTrack,
  playPause,
  trackForward,
  trackBackward,
  mute,
  muffle,
  setVolume,
  playFX
} = audioSlice.actions;

export default audioSlice.reducer;