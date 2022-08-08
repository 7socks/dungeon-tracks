import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io'

import Dungeon from './Dungeon';
import MuffleButton from './MuffleButton';
import { FXIcon } from './FXIcon';

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
  height: 2.5em;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: var(--theme-bar-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;

  span {
    margin: 0 .5em;
  }

  div {
    display: flex;
    flex-direction: row;

    * {
      margin: 0 .2em;
    }
  }

  #more-fx {
    background: none;
    color: var(--theme-text);
    border: 2px solid var(--theme-text);
    border-radius: 50%;
    height: 2em;
    width: 2em;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ControlBar = ({currentDungeon, currentTrack}) => {
  return <ControlBarContainer>
    <img src={currentDungeon.cover}></img>
    <span>{currentTrack.title}</span>

    <MuffleButton/>

    <div className="audio-bar">
      <IoMdSkipBackward/>
      <FaPlay/>
      <FaPause/>
      <IoMdSkipForward/>
    </div>

    <div className="fx-bar">
      {currentDungeon.effects.slice(0,3).map((effect, i) => {
        return <FXIcon
          key={i}
          icon={effect.icon}
          color={effect.color}
          onClick={()=>{}}
        />;
      })}
      <button id="more-fx"><BsThreeDots/></button>
    </div>

    <span>{currentDungeon.title}</span>
  </ControlBarContainer>;
};

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const App = () => {
  const [currentDungeon, setCurrentDungeon] = useState(example);
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