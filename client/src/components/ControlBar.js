import React from 'react';
import styled from 'styled-components';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

import MuffleButton from './MuffleButton';
import { FXIcon } from './FXIcon';

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
    border: none;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ControlBar = ({currentDungeon, currentTrack, setTrack, setEffect}) => {
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

export default ControlBar;