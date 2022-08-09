import React from 'react';
import styled from 'styled-components';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import { useSelector, useDispatch } from 'react-redux';
import { setTrack } from '../app/reducers/audioSlice';

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
  align-items: center;

  * {
    margin: 1em 0;
  }

  div {
    display: flex;
    flex-direction: row;

    * {
      margin: 0 .5em;
    }
  }
`;

const AudioControls = ({currentDungeon, currentTrack, fxCount}) => {
  return (<>
    <span>{currentTrack.title}</span>

    <div className="audio-bar">
      <IoMdSkipBackward/>
      <FaPlay/>
      <IoMdSkipForward/>
    </div>

    <div id="volume-bar">
      <HiVolumeUp/>
      <input type="range"/>
    </div>
    <MuffleButton/>

    <div className="fx-bar">
      {currentDungeon.effects.slice(0, fxCount).map((effect, i) => {
        return <FXIcon
          key={i}
          icon={effect.icon}
          color={effect.color}
          onClick={()=>{}}
        />;
      })}
      {
        fxCount > 0
        ? <button id="more-fx"><BsThreeDots/></button>
        : null
      }
    </div>
  </>);
}

const ControlBar = () => {
  const dungeon = useSelector((state) => state.audio.dungeon)
  const track = useSelector((state) => state.audio.track);
  const dispatch = useDispatch();

  return <ControlBarContainer>
    <AudioControls fxCount={3} currentDungeon={dungeon} currentTrack={track}/>
    <span id="dungeon-title">{dungeon.title}</span>
  </ControlBarContainer>;
};

const PlaylistControls = ({dungeon}) => {
  return (<PlaylistControlsContainer>
    <AudioControls
      currentDungeon={dungeon}
      currentTrack={{}}
      fxCount={0}
    />
  </PlaylistControlsContainer>);
};

export { ControlBar, PlaylistControls };