import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Dungeon from './Dungeon';

const example = {
  title: "Dragon Lair",
  tracks: [
    {
      title: "In the Hall of the Mountain King",
      source: ""
    }
  ],
  effects: [
    {
      title: "Roar",
      source: ""
    }
  ],
  creator: "dev",
  cover: ""
};

const NavContainer = styled.div`
  height: 2.5em;
`;

const Nav = ({}) => {
  return <NavContainer>
    <span>Dungeon Tracks</span>
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