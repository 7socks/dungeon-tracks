import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HiPencilAlt } from 'react-icons/hi';
import { BiListMinus } from 'react-icons/bi';
import { CgPlayListRemove } from 'react-icons/cg';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import Audio from '../app/audio';
import REQUEST from '../router/router';

import { useSelector, useDispatch } from 'react-redux';
import { setTrack, setDungeon, playFX, playPause } from '../app/reducers/audioSlice';

import { FXIcon, FXIconEditor } from './FXIcon';
import Loader from './Loader';

const PlaylistContainer = styled.div`
  position: relative;
  width: ${({fx}) => fx ? '30' : '40'}%;
  cursor: default;
  margin-bottom: 1em;

  h2 {
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 0 0 .2em .2em;
    font-size: 18px;
  }

  ol {
    background: var(--theme-list-bg);
    list-style-type: none;
    padding-inline-start: 0;
    padding: 0;
    margin: 0;
    font-size: 16px;
    height: 100%;
    font-family: var(--theme-font-thin);
    font-weight: 300;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .2em 0;
    position: relative;

    button:not(.edit-btn-confirm):not(.edit-btn-cancel):not(.opt-btn) {
      visibility: hidden;
    }

    span {
      margin-left: .5em;
    }
  }

  li:hover {
    background: var(--theme-list-bg-highlight);

    button:not(.edit-btn-confirm):not(.edit-btn-cancel):not(.opt-btn) {
      visibility: visible;
    }
  }

  .link {
    display: inline-flex;
    cursor: pointer;
    color: var(--theme-btn-text-dim);
    :hover {
      color: var(--theme-btn-text-undim);
    }
  }
`;

const TrackTitle = styled.span`
  color: ${({selected}) =>
    selected
    ? 'var(--theme-list-text-selected);'
    : 'var(--theme-list-text);'
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: var(--theme-btn-text-dim);
  padding: .2em;

  :hover {
    color: var(--theme-btn-text-undim);
`;

const OptionButton = styled.button`
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  padding-top: 0;
  font-size: 18px;
  color: var(--theme-btn-text-dim);
  height: 100%;

  :hover {
    color: var(--theme-btn-text-undim);
  }
`;

const RemovalButton = styled(OptionButton)`
  position: absolute;
  right: 0;
  font-size: 20px;
  color: ${({active}) =>
      active
      ? 'var(--theme-text)'
      : 'var(--theme-btn-text-dim)'
    };

  :hover {
    color: ${({active}) =>
      active
      ? 'var(--theme-text)'
      : 'var(--theme-btn-text-undim)'
    };
  }
`;

const EditIconButton = styled(EditButton)`
  color: ${({editing, i}) =>
    editing === i
    ? 'var(--theme-text-highlight)'
    : 'var(--theme-btn-text-dim)'
  };

  :hover {
    color: ${({editing, i}) =>
    editing === i
    ? 'var(--theme-text-highlight)'
    : 'var(--theme-btn-text-undim)'
  }
  }
`;

const EditButtonsContainer = styled.div`
  position: absolute;
  right: 0;
`;

const Playlist = ({playlist, fx, updateList, viewDungeon, loading, addSounds, removeSound}) => {
  const [editIcon, setEditIcon] = useState(null);
  const [removingTracks, setRemovingTracks] = useState(false);

  const playingEffect = useSelector((state) => state.audio.effect);
  const playingTrack = useSelector((state) => state.audio.track);
  const playingDungeon = useSelector((state) => state.audio.dungeon);
  const dispatch = useDispatch();

  const isSelected = playingDungeon && playingDungeon.id === viewDungeon.id;
  const selectedTrack = playingDungeon ? playingDungeon.tracks[playingTrack] : null;

  useEffect(() => {
    if (playlist.length === 0) {
      setRemovingTracks(false);
    }
  }, [playlist]);

  const orderPlaylist = (e, index, shift) => {
    e.stopPropagation();

    if (!loading) {
      let updatedPlaylist = playlist.slice();
      let current = playlist[index];
      let alt = playlist[index + shift];

      updatedPlaylist[index] = alt;
      updatedPlaylist[index + shift] = current;

      updateList(!!fx, updatedPlaylist);
    }
  };

  const updateIcon = (index, icon, color) => {
    let effect = playlist[index];
    let updatedPlaylist = playlist.slice();
    let updatedEffect = {
      id: effect.id,
      effect_id: effect.effect_id,
      position: effect.position,
      source: effect.source,
      title: effect.title,
      icon: icon,
      color: color,
    };

    updatedPlaylist[index] = updatedEffect;
    updateList(true, updatedPlaylist);
  };

  const selectTrack = (index) => {
    dispatch(setDungeon(viewDungeon));
    dispatch(setTrack(index));
    dispatch(playPause(true));
    Audio.playQueue(viewDungeon.tracks, index, (i) => {
      dispatch(setTrack(i));
    });
  };

  return (
    <PlaylistContainer fx={fx}>
      <h2>
        <span>{fx ? 'Effects' : 'Tracks'}</span>
        { loading ? <Loader size="inherit"/> : null }
        {
          playlist.length > 0
          ? <RemovalButton
              className="set-remove-btn opt-btn"
              active={removingTracks}
              onClick={() => setRemovingTracks(!removingTracks)}
            >
              <BiListMinus/>
            </RemovalButton>
          : null
        }
      </h2>
      {
          playlist.length === 0
          ? <span className="link" onClick={addSounds}>
            <FaPlus/> Add {fx ? 'effects' : 'tracks'}
            </span>
          : null
      }
      <ol>
        {
          playlist.map((track, i) => {
            return <li
              key={i}
              onClick={(e) => {
                if (fx) {
                  dispatch(playFX(track));
                  Audio.playFX(track.source, () => {
                    dispatch(playFX(null));
                  });
                } else {
                  selectTrack(i);
                }
              }}
            >
              {
                fx
                ? <FXIcon
                  icon={track.icon}
                  color={track.color}
                  playing={playingEffect === track}
                  />
                : null
              }

              {
                removingTracks
                ? <OptionButton className="remove-btn opt-btn" onClick={(e) => {
                  e.stopPropagation();
                  removeSound(!!fx, playlist[i].id);
                }}>
                  <CgPlayListRemove/>
                </OptionButton>
                : null
              }

              <TrackTitle selected={!fx && isSelected && selectedTrack.id === track.id}>
                {track.title}
              </TrackTitle>

              <EditButtonsContainer>
                {
                  i > 0
                  ? <EditButton loading={loading} onClick={(e) => orderPlaylist(e, i, -1, fx)}>
                      <TiArrowSortedUp/>
                    </EditButton>
                  : null
                }

                {
                  i + 1 < playlist.length
                  ? <EditButton loading={loading} onClick={(e) => orderPlaylist(e, i, 1, fx)}>
                      <TiArrowSortedDown/>
                    </EditButton>
                  : null
                }

                {
                fx
                ? <EditIconButton
                    i={i}
                    editing={editIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditIcon(editIcon !== null ? null : i);
                    }}
                  >
                    <HiPencilAlt/>
                  </EditIconButton>
                : null
              }
              </EditButtonsContainer>

              {
                i === editIcon
                ? <FXIconEditor
                    effect={track}
                    onConfirm={(icon, color) => {
                      updateIcon(i, icon, color);
                      setEditIcon(null);
                    }}
                    onCancel={() => setEditIcon(null)}
                  />
                : null
              }
            </li>;
          })
        }
      </ol>
    </PlaylistContainer>
  );
};

export default Playlist;