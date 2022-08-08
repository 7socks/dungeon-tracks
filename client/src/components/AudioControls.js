import React from 'react';
import styled from 'styled-components';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

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

  #dungeon-title {
    font-size: 18px;
  }
`;

const PlaylistControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AudioControls = ({currentDungeon, currentTrack, fxCount}) => {
  return (<>
    <span>{currentTrack.title}</span>

    <div className="audio-bar">
      <IoMdSkipBackward/>
      <FaPlay/>
      <IoMdSkipForward/>
    </div>

    <MuffleButton/>
    <div id="volume-bar">
      <HiVolumeUp/>
      <input type="range"/>
    </div>

    <div className="fx-bar">
      {currentDungeon.effects.slice(0, fxCount).map((effect, i) => {
        return <FXIcon
          key={i}
          icon={effect.icon}
          color={effect.color}
          onClick={()=>{}}
        />;
      })}
      <button id="more-fx"><BsThreeDots/></button>
    </div>
  </>);
}

const ControlBar = ({currentDungeon, currentTrack, setTrack, setEffect}) => {
  return <ControlBarContainer>
    <AudioControls fxCount={3} currentDungeon={currentDungeon} currentTrack={currentTrack}/>
    <span id="dungeon-title">{currentDungeon.title}</span>
  </ControlBarContainer>;
};

const PlaylistControls = ({}) => {
  return (<PlaylistControlsContainer>
    <AudioControls/>
  </PlaylistControlsContainer>);
};

export { ControlBar, PlaylistControls };