import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { FaPlay, FaPause, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import Audio from '../app/audio';

import { useSelector, useDispatch } from 'react-redux';
import {
  setDungeon, setTrack, playPause, trackForward, trackBackward,
  setVolume, mute, playFX
} from '../app/reducers/audioSlice';

import MuffleButton from './MuffleButton';
import VolumeSlider from './VolumeSlider';
import { FXIcon } from './FXIcon';

const createScrollAnimation = (start, offset) => {
  return keyframes`
    from {
      transform: translateX(${start});
    }

    to {
      transform: translateX(${offset});
    }
  `;
};

const ControlsContainer = styled.div`
  button:not(.muffle-btn) {
    display: grid;
    background: none;
    border: none;
    color: var(--theme-btn-text-undim);
    font-size: 16px;
    cursor: pointer;
  }

  button:not(.muffle-btn):hover {
    color: var(--theme-text);
  }

  .track-title {
    width: 15em;
    text-overflow-x:
  }

  #volume-bar {
    align-items: center;
    * {
      margin: 0;
    }
  }
`;

const ControlBarContainer = styled(ControlsContainer)`
  z-index: var(--layer-bar);
  height: 2.5em;
  min-height: 2.5em;
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

  #dungeon-title {
    font-size: 18px;

    :hover {
      color: var(--theme-text-highlight);
      cursor: pointer;
    }
  }
`;

const FxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
  width: 10em;

  .icon-main {
    cursor: pointer;
  }

  .fx-window {
    z-index: var(--layer-popup);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    position: absolute;
    bottom: 2em;
    left: -2em;
    background: var(--theme-bar-bg);
    padding: .2em;
    padding-bottom: 0;
    border: 1px solid var(--theme-bar-border);
    border-bottom: none;
    border-radius: .5em .5em 0 0;

    .icon {
      margin-bottom: .2em;
    }
  }

  #more-fx {
    background: none;
    border: none;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
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

const FxBar = ({ dungeon }) => {
  const [moreFx, setMoreFx] = useState(false);
  const playingFX = useSelector((state) => state.audio.effect);
  const dispatch = useDispatch();

  return <FxContainer>
    <div className={moreFx ? 'fx-window' : 'fx-bar'}>
      {dungeon && dungeon.effects.slice(0, moreFx ? dungeon.effects.length : 3).map((effect, i) => {
        return <FXIcon
          key={i}
          icon={effect.icon}
          color={effect.color}
          playing={playingFX && playingFX.id === effect.id}
          onClick={() => {
            dispatch(playFX(effect));
            Audio.playFX(effect.source, () => {
              dispatch(playFX(null));
            });
          }}
        />;
      })}
    </div>
    {
        dungeon && dungeon.effects.length > 3
          ? <button
            id="more-fx"
            onClick={() => setMoreFx(!moreFx)}
          >
            {
              moreFx
                ? <FaChevronDown/>
                : <FaChevronUp/>
            }
          </button>
          : null
      }
  </FxContainer>
};

const TrackScrollContainer = styled.span`
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

  #scroll-2 {
    display: none;
  }

  :hover {
    text-overflow: clip;

    span {
      position: absolute;
      overflow: visible;
    }

    #scroll-2 {
      display: ${({animation2}) => animation2 === null ? 'none' : 'inline-block'};
      animation: ${({animation2}) => animation2} ${({seconds}) => seconds}s linear infinite;
    }

    #scroll {
      animation: ${({animation}) => animation} ${({seconds}) => seconds}s linear infinite;
    }
  }
`;

const TrackScroll = ({track}) => {
  const [scrollAnimation, setScrollAnimation] = useState(null);
  const [scrollAnimation2, setScrollAnimation2] = useState(null);
  const [scrollTime, setScrollTime] = useState(0);

  useEffect(() => {
    let boxWidth = document.getElementById('scroll-box').scrollWidth;
    let scrollWidth = document.getElementById('scroll').scrollWidth;

    if (scrollWidth > boxWidth) {
      let offset = 0 - scrollWidth - 15;
      setScrollAnimation(createScrollAnimation('0px', offset + 'px'));
      setScrollAnimation2(createScrollAnimation((-1 * offset) + 'px', '0px'));
      setScrollTime(-1 * offset / 60);
    } else {
      setScrollAnimation(null);
      setScrollAnimation2(null);
      setScrollTime(0);
    }
  }, [track]);

  return <TrackScrollContainer
    id="scroll-box"
    animation={scrollAnimation}
    animation2={scrollAnimation2}
    seconds={scrollTime}
  >
    <span id="scroll">{track && track.title}</span>
    <span id="scroll-2">{track && track.title}</span>
  </TrackScrollContainer>
};

const AudioControls = ({currentDungeon, currentTrack, includeFx, onPlay}) => {
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

  return (<>
    {
      includeFx
        ? <TrackScroll track={currentTrack}/>
        : <span className="track-title">{currentTrack && currentTrack.title}</span>
    }

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
      <VolumeSlider
        volume={volume}
        setVolume={(value) => {
          dispatch(setVolume(Number(value)));
          Audio.setVolume(Number(value));
        }}
      />
    </div>
    <MuffleButton/>

    {
      includeFx
      ? <FxBar dungeon={currentDungeon}/>
      : null
    }
  </>);
}

const ControlBar = ({ setPage, setViewDungeon }) => {
  const dungeon = useSelector((state) => state.audio.dungeon)
  const track = useSelector((state) => state.audio.track);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (dungeon) {
      setViewDungeon(dungeon);
      setPage(3);
    }
  };

  return <ControlBarContainer>
    <AudioControls
      includeFx={true}
      currentDungeon={dungeon}
      currentTrack={dungeon ? dungeon.tracks[track] : null}
    />
    <span id="dungeon-title" onClick={handleClick}>
      {dungeon && dungeon.title}
    </span>
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
      includeFx={false}
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