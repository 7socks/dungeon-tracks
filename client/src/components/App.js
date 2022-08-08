import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Dungeon from './Dungeon';
import { ControlBar } from './AudioControls';

const example = {
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

const NavContainer = styled.div`
  height: 2.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: default;

  h1 {
    margin: 0;
  }

  div {
    width: 50%;
    display: flex;
    justify-content: space-around;
  }

  span {
    font-size: 22px;
    color: var(--theme-text);
  }

  span:hover {
    color: var(--theme-text-highlight);
  }
`;

const Nav = ({}) => {
  return <NavContainer>
    <h1>Dungeon Tracks</h1>
    <div>
      <span>Browse Sounds</span>
      <span>Your Dungeons</span>
    </div>
  </NavContainer>;
};

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const App = () => {
  const [currentDungeon, setCurrentDungeon] = useState(example);
  const [currentTrack, setCurrentTrack] = useState(example.tracks[0]);
  const [currentEffect, setCurrentEffect] = useState({});

  return (
    <AppContainer>
      <Nav/>

      <Dungeon dungeon={example}/>

      <ControlBar
        currentDungeon={currentDungeon}
        currentTrack={currentTrack}
        setTrack={setCurrentTrack}
        setEffect={setCurrentEffect}
      />

      <audio id="track-audio" src={currentTrack.source}/>
      <audio id="effect-audio" src={currentEffect.source}/>
    </AppContainer>
  );
};

export default App;