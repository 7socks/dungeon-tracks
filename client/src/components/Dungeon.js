import React, { useState } from 'react';
import styled from 'styled-components';
import { HiPencilAlt } from 'react-icons/hi';

import { useSelector, useDispatch } from 'react-redux';
import { setTrack } from '../app/reducers/audioSlice';

import { PlaylistControls } from './AudioControls';
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

    span {
      margin-left: .5em;
    }
  }

  li:hover {
    background: var(--theme-list-bg-highlight);
  }
`;

const EditIconButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  font-size: 16px;
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

const Playlist = ({playlist, fx, updateIcon}) => {
  const [editIcon, setEditIcon] = useState(null);

  return (
    <PlaylistContainer fx={fx}><ol>
      {
        playlist.map((track, i) => {
          return <li key={i}>
            { fx ? <FXIcon icon={track.icon} color={track.color} onClick={()=>{}}/> : null }
            <span>{track.title}</span>
            {
              fx
              ? <EditIconButton i={i} editing={editIcon} onClick={() => setEditIcon(editIcon !== null ? null : i)}><HiPencilAlt/></EditIconButton>
              : null
            }
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

const DungeonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  h1 {
    width: 100%;
  }
`;

const Dungeon = ({viewDungeon}) => {
  const updateEffect = (effect) => {
    // input 'effect' == new version of effect obj
    // call to server to update db

    // update effect as it exists as a prop in state (w/in dungeon)
    // currently only works locally bc dungeon is a ext. constant
  };

  return (
    <DungeonContainer>
      <h1>{viewDungeon.title}</h1>

      <PlaylistControls dungeon={viewDungeon}/>
      <Playlist playlist={viewDungeon.tracks} fx={0}/>
      <Playlist playlist={viewDungeon.effects} fx={1} updateIcon={updateEffect}/>
    </DungeonContainer>
  );
};

export default Dungeon;