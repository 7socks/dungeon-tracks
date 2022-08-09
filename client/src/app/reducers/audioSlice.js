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
      source: "",
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
    playing: false
  },
  reducers: {
    setDungeon: (state, action) => {
      state.dungeon = action.payload;
    },
    setTrack: (state, action) => {
      state.track = action.payload;
    },
    playPause: (state) => {
      state.playing = !state.playing;
    }
  }
});

export const { setDungeon, setTrack, playPause } = audioSlice.actions;
export default audioSlice.reducer;