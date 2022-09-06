import React from 'react';
import styled, { keyframes } from 'styled-components';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import Audio from '../app/audio';

import { useSelector, useDispatch } from 'react-redux';
import {
  setDungeon, setTrack, playPause, trackForward, trackBackward,
  setVolume, mute, playFX
} from '../app/reducers/audioSlice';

import MuffleButton from './MuffleButton';
import { FXIcon } from './FXIcon';

const scrollAnimation = keyframes`
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(-100%);
  }
`;

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
  z-index: var(--layer-bar);
  height: 2.5em;
  width: 100%;
  position: relative;
  bottom: 0;
  background: var(--theme-bar-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  border-top: 1px solid var(--theme-bar-border);

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

  .track-title {
    position: relative;
    width: 15em;
    height: 100%;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span {
      display: inline-block;
      height: fit-content;
      width: fit-content;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }

    :hover {
      text-overflow: clip;

      span {
        position: absolute;
        overflow: visible;
        animation: ${scrollAnimation} 3s linear infinite;
      }
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
  const playingFX = useSelector((state) => state.audio.effect);
  const dispatch = useDispatch();

  const onPlayPause = () => {
    if (currentDungeon.tracks.length > 0) {
      onPlay && onPlay();
      dispatch(playPause());

      playing ? Audio.pause() : Audio.resume();
    }
  };

  // if (currentDungeon === null) {
  //   return (<>
  //     <span className="track-title"></span>
  //   </>);
  // }
  return (<>
    <span className="track-title"><span>{currentTrack && currentTrack.title}</span></span>

    <div className="audio-bar">
      <button onClick={
        currentDungeon === null
        ? () => {}
        : () => {
          dispatch(trackBackward());
          Audio.skipBack((i) => {
            dispatch(setTrack(i));
          });
        }
      }>
        <IoMdSkipBackward/>
      </button>

      <button onClick={
        currentDungeon === null
        ? () => {}
        : onPlayPause
      }>
        { playing ? <FaPause/> : <FaPlay/> }
      </button>

      <button onClick={
        currentDungeon === null
        ? () => {}
        : () => {
          dispatch(trackForward());
          Audio.skipForward((i) => {
            dispatch(setTrack(i));
          });
        }
      }>
        <IoMdSkipForward/>
      </button>
    </div>

    <div id="volume-bar">
      <button onClick={() => {
        dispatch(mute());
        Audio.mute(!muted);
      }}>
        { muted ? <HiVolumeOff/> : <HiVolumeUp/> }
      </button>
      <input
        type="range"
        step=".05"
        min="0"
        max="1"
        value={volume}
        onChange={(e) => {
          dispatch(setVolume(Number(e.target.value)));
          Audio.setVolume(Number(e.target.value));
        }}
      />
    </div>
    <MuffleButton/>

    <div className="fx-bar">
      {currentDungeon && currentDungeon.effects.slice(0, fxCount).map((effect, i) => {
        return <FXIcon
          key={i}
          icon={effect.icon}
          color={effect.color}
          playing={playingFX && playingFX.index === effect.index}
          onClick={() => {
            dispatch(playFX(effect));
            Audio.playFX(effect.source, () => {
              dispatch(playFX(null));
            });
          }}
        />;
      })}
      {
        currentDungeon && fxCount > 0
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
      currentTrack={dungeon ? dungeon.tracks[track] : null}
    />
    <span id="dungeon-title">{dungeon && dungeon.title}</span>
  </ControlBarContainer>;
};

const PlaylistControls = ({dungeon}) => {
  const selectedDungeon = useSelector((state) => state.audio.dungeon);
  const track = useSelector((state) => state.audio.track)
  const dispatch = useDispatch();

  let selected = selectedDungeon && selectedDungeon.id === dungeon.id;

  return (<PlaylistControlsContainer>
    <AudioControls
      currentDungeon={dungeon}
      currentTrack={selected ? selectedDungeon.tracks[track] : null}
      fxCount={0}
      onPlay={() => {
        if (selectedDungeon !== dungeon) {
          dispatch(setDungeon(dungeon));
          dispatch(setTrack(0));
          Audio.playQueue(dungeon.tracks, 0, (i) => {
            dispatch(setTrack(i));
          });
        }
      }}
    />
  </PlaylistControlsContainer>);
};

export { ControlBar, PlaylistControls };