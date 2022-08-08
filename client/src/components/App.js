import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Dungeon from './Dungeon';

const example = {
  title: "Dragon Lair",
  tracks: [
    {
      title: "In the Hall of the Mountain King",
      source: ""
    },
    {
      title: "SAIL",
      source: ""
    },
    {
      title: "Clash vx80 - Remix",
      source: ""
    }
  ],
  effects: [
    {
      title: "Roar",
      source: "",
      icon: "dragon",
      color: "green"
    },
    {
      title: "Falling Treasure",
      source: "",
      icon: "music",
      color: "orange"
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

const ControlBarContainer = styled.div`
  height: 2em;
  position: absolute;
`;

const ControlBar = ({currentDungeon, currentTrack}) => {
  return <ControlBarContainer>
    <img src={currentDungeon.cover}></img>
  </ControlBarContainer>;
};

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const App = () => {
  const [currentDungeon, setCurrentDungeon] = useState({});
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentEffect, setCurrentEffect] = useState({});

  return (
    <AppContainer>
      <Nav/>

      <Dungeon dungeon={example}/>

      <ControlBar
        currentDungeon={currentDungeon}
        currentTrack={currentTrack}
      />

      <audio id="track-audio" src={currentTrack.source}/>
      <audio id="effect-audio" src={currentEffect.source}/>
    </AppContainer>
  );
};

export default App;