import React from 'react';
import styled from 'styled-components';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import { useSelector, useDispatch } from 'react-redux';
import {
  setDungeon, setTrack, playPause, trackForward, trackBackward,
  setVolume, mute
} from '../app/reducers/audioSlice';

import MuffleButton from './MuffleButton';
import { FXIcon } from './FXIcon';

const ControlsContainer = styled.div`
  button:not(.muffle-btn) {
    display: grid;
    background: none;
    border: none;
    color: var(--theme-btn-text-undim);
    font-size: 16px;
  }

  button:not(.muffle-btn):hover {
    color: var(--theme-text);
  }

  .track-title {
    width: 15em;
    text-overflow-x:
  }

  #volume-bar {
    * {
      margin: 0;
    }
  }
`;

const ControlBarContainer = styled(ControlsContainer)`
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

const PlaylistControlsContainer = styled(ControlsContainer)`
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

  .track-title {
    text-align: center;
  }
`;

const AudioControls = ({currentDungeon, currentTrack, fxCount, onPlay}) => {
  const playing = useSelector((state) => state.audio.playing);
  const volume = useSelector((state) => state.audio.volume);
  const muted = useSelector((state) => state.audio.muted);
  const dispatch = useDispatch();

  const onPlayPause = () => {
    onPlay && onPlay();
    dispatch(playPause());
  };

  return (<>
    <span className="track-title">{currentTrack.title}</span>

    <div className="audio-bar">
      <button onClick={() => dispatch(trackBackward())}><IoMdSkipBackward/></button>
      <button onClick={onPlayPause}>
        { playing ? <FaPause/> : <FaPlay/> }
      </button>
      <button onClick={() => dispatch(trackForward())}><IoMdSkipForward/></button>
    </div>

    <div id="volume-bar">
      <button onClick={() => dispatch(mute())}>
        { muted ? <HiVolumeOff/> : <HiVolumeUp/> }
      </button>
      <input
        type="range"
        step=".05"
        min="0"
        max="1"
        value={volume}
        onChange={(e) => dispatch(setVolume(Number(e.target.value)))}
      />
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
    <AudioControls
      fxCount={3}
      currentDungeon={dungeon}
      currentTrack={dungeon.tracks[track]}
    />
    <span id="dungeon-title">{dungeon.title}</span>
  </ControlBarContainer>;
};

const PlaylistControls = ({dungeon}) => {
  const selectedDungeon = useSelector((state) => state.audio.dungeon);
  const track = useSelector((state) => state.audio.track)
  const dispatch = useDispatch();

  let selected = selectedDungeon.id === dungeon.id;

  return (<PlaylistControlsContainer>
    <AudioControls
      currentDungeon={dungeon}
      currentTrack={selected ? selectedDungeon.tracks[track] : {}}
      fxCount={0}
      onPlay={() => dispatch(setDungeon(dungeon))}
    />
  </PlaylistControlsContainer>);
};

export { ControlBar, PlaylistControls };