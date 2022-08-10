import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HiPencil } from 'react-icons/hi';
import { ImCheckmark } from 'react-icons/im';

import { PlaylistControls } from './AudioControls';
import Playlist from './Playlist';

const DungeonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  button:not(.muffle-btn) {
    border: none;
    background: none;
    color: var(--theme-btn-text-dim);

    :hover {
      color: var(--theme-btn-text-undim);
    }
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1.2em 0 1.2em 1em;

  h1 {
    margin: 0;
  }

  button {
    font-size: 16px;
  }
`;

const DungeonTitle = ({title, update}) => {
  const [focused, setFocused] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  useEffect(() => {
    setFocused(editing);
  }, [editing]);

  const edit = (e) => {
    setEditTitle(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  if (!editing) {
    return <TitleContainer>
      <h1>{title}</h1>
      <button onClick={() => setEditing(true)}>
        <HiPencil/>
      </button>
    </TitleContainer>;
  } else {
    return (<TitleContainer onBlur={focused ? handleBlur : null}>
      <input type="text" value={editTitle} onChange={edit} autoFocus/>
      <button onClick={() => {
        setEditing(false);
        update(editTitle);
      }}><ImCheckmark/></button>
    </TitleContainer>);
  }
};

const Dungeon = ({viewDungeon, setViewDungeon}) => {
  const updateEffect = (effect) => {
    // input 'effect' == new version of effect obj
    // call to server to update db

    // update effect as it exists as a prop in state (w/in dungeon)
    // currently only works locally bc dungeon is a ext. constant
  };

  const updatePlaylist = (isFX, list) => {
    let playlist = isFX ? 'effects' : 'tracks';
    let updatedDungeon = {
      title: viewDungeon.title,
      tracks: viewDungeon.tracks,
      effects: viewDungeon.effects,
      creator: viewDungeon.creator,
      cover: viewDungeon.cover,
    };

    updatedDungeon[playlist] = list;
    setViewDungeon(updatedDungeon);

    // send to server
  };

  return (
    <DungeonContainer>
      <DungeonTitle title={viewDungeon.title} update={() => {}}/>

      <PlaylistControls dungeon={viewDungeon}/>
      <Playlist updateList={updatePlaylist} playlist={viewDungeon.tracks} viewDungeon={viewDungeon}fx={0}/>
      <Playlist updateList={updatePlaylist} playlist={viewDungeon.effects} viewDungeon={viewDungeon} fx={1}/>
    </DungeonContainer>
  );
};

export default Dungeon;