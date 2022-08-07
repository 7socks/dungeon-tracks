import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';

import { FXIcon, FXIconEditor } from './FXIcon';

const AudioControlContainer = styled.div`
  width: 30%;
`;

const AudioControl = ({}) => {
  return <AudioControlContainer>
  </AudioControlContainer>;
}

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
    border-bottom: 1px solid var(--theme-list-border-inner)

    span {
      margin-left: .5em;
    }
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
              ? <EditIconButton i={i} editing={editIcon} onClick={() => setEditIcon(editIcon !== null ? null : i)}><MdEdit/></EditIconButton>
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
  width: 100%;

  h1 {
    width: 100%;
  }
`;

const Dungeon = ({dungeon}) => {
  const updateEffect = (effect) => {
    // input 'effect' == new version of effect obj
    // call to server to update db

    // update effect as it exists as a prop in state (w/in dungeon)
    // currently only works locally bc dungeon is a ext. constant
  };

  return (
    <DungeonContainer>
      <h1>{dungeon.title}</h1>

      <AudioControl/>
      <Playlist playlist={dungeon.tracks} fx={0}/>
      <Playlist playlist={dungeon.effects} fx={1} updateIcon={updateEffect}/>
    </DungeonContainer>
  );
};

export default Dungeon;