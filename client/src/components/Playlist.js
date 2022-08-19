import React, { useState } from 'react';
import styled from 'styled-components';
import { HiPencilAlt } from 'react-icons/hi';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import Audio from '../app/audio';

import { useSelector, useDispatch } from 'react-redux';
import { setTrack, setDungeon, playFX } from '../app/reducers/audioSlice';

import { FXIcon, FXIconEditor } from './FXIcon';

const PlaylistContainer = styled.div`
  position: relative;
  width: ${({fx}) => fx ? '30' : '40'}%;
  cursor: default;

  h2 {
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
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .2em 0;
    position: relative;

    button {
      visibility: hidden;
    }

    span {
      margin-left: .5em;
    }
  }

  li:hover {
    background: var(--theme-list-bg-highlight);

    button {
      visibility: visible;
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

const Playlist = ({playlist, fx, updateList, viewDungeon}) => {
  const [editIcon, setEditIcon] = useState(null);
  const playingEffect = useSelector((state) => state.audio.effect);
  const playingTrack = useSelector((state) => state.audio.track);
  const playingDungeon = useSelector((state) => state.audio.dungeon);
  const dispatch = useDispatch();

  const isSelected = playingDungeon.id === viewDungeon.id;
  const selectedTrack = playingDungeon.tracks[playingTrack];

  const orderPlaylist = (e, index, shift) => {
    e.stopPropagation();

    let updatedPlaylist = playlist.slice();
    let current = playlist[index];
    let alt = playlist[index + shift];

    updatedPlaylist[index] = alt;
    updatedPlaylist[index + shift] = current;

    updateList(!!fx, updatedPlaylist);
  };

  const updateIcon = (index, icon, color) => {
    let effect = playlist[index];
    let updatedPlaylist = playlist.slice();

    effect.icon = icon;
    effect.color = color;
    updatedPlaylist[index] = effect;

    updateList(true, updatedPlaylist);
  };

  const selectTrack = (i) => {
    dispatch(setDungeon(viewDungeon));
    dispatch(setTrack(i));
    Audio.playQueue(viewDungeon.tracks.slice(i), (i) => {
      dispatch(setTrack(i));
    });
  };

  return (
    <PlaylistContainer fx={fx}>
      <h2>{fx ? 'Effects' : 'Tracks'}</h2>
      <ol>
        {
          playlist.map((track, i) => {
            return <li
              key={i}
              onClick={() => {
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
                  onClick={()=>{}}
                  />
                : null
              }

              <TrackTitle selected={!fx && isSelected && selectedTrack.id === track.id}>
                {track.title}
              </TrackTitle>

              <EditButtonsContainer>
                {
                  i > 0
                  ? <EditButton onClick={(e) => orderPlaylist(e, i, -1, fx)}>
                      <TiArrowSortedUp/>
                    </EditButton>
                  : null
                }

                {
                  i + 1 < playlist.length
                  ? <EditButton onClick={(e) => orderPlaylist(e, i, 1, fx)}>
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
                    onCancel={(e) => {
                      e.stopPropagation();
                      setEditIcon(null);
                    }}
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