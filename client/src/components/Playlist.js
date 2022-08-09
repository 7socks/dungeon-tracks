import React from 'react';
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

const Playlist = ({playlist, fx, updateIcon}) => {
  const [editIcon, setEditIcon] = useState(null);

  return (
    <PlaylistContainer fx={fx}><ol>
      {
        playlist.map((track, i) => {
          return <li key={i}>
            { fx ? <FXIcon icon={track.icon} color={track.color} onClick={()=>{}}/> : null }

            <span>{track.title}</span>

            <EditButtonsContainer>
              <EditButton><TiArrowSortedUp/></EditButton>
              <EditButton><TiArrowSortedDown/></EditButton>
              {
              fx
              ? <EditIconButton i={i} editing={editIcon} onClick={() => setEditIcon(editIcon !== null ? null : i)}><HiPencilAlt/></EditIconButton>
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
                  onCancel={() => setEditIcon(null)}
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