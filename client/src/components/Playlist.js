import React, { useState } from 'react';
import styled from 'styled-components';
import { HiPencilAlt } from 'react-icons/hi';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import { useSelector, useDispatch } from 'react-redux';
import { setTrack } from '../app/reducers/audioSlice';

import { FXIcon, FXIconEditor } from './FXIcon';

const PlaylistContainer = styled.div`
  width: ${({fx}) => fx ? '30' : '40'}%;
  cursor: default;

  background: var(--theme-list-bg);

  ol {
    list-style-type: none;
    padding-inline-start: 0;
    padding: none;
    font-size: 16px;
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

const Playlist = ({playlist, fx, updateList}) => {
  const [editIcon, setEditIcon] = useState(null);
  const dispatch = useDispatch();

  const orderPlaylist = (e, index, shift) => {
    e.stopPropagation();

    let current = playlist[index];
    let alt = playlist[index + shift];

    alt.index = index;
    current.index = index + shift;

    playlist[index] = alt;
    playlist[index + shift] = current;

    updateList(!!fx, playlist);
  };

  const updateIcon = (e, index, icon, color) => {
    var effect = playlist[index];
    effect.icon = icon;
    effect.color = color;
    updateList(true, playlist);
  };

  return (
    <PlaylistContainer fx={fx}><ol>
      {
        playlist.map((track, i) => {
          return <li
            key={i}
            onClick={() =>
              fx
              ? null
              : dispatch(setTrack(track))
            }
          >
            { fx ? <FXIcon icon={track.icon} color={track.color} onClick={()=>{}}/> : null }

            <span>{track.title}</span>

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
                  onConfirm={(effect) => {
                    updateIcon(effect);
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
    </ol></PlaylistContainer>
  );
};

export default Playlist;