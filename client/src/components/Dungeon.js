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
    font-size: 32px;
  }

  input {
    margin: 0;
    font-size: 32px;
    background: none;
    color: var(--theme-text);
    border: none;
    border-bottom: 2px solid var(--theme-btn-text-undim);
    outline: none;
    font-family: inherit;
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

  const handleBlur = () => {
    setTimeout(() => {
      setEditing(false);
    }, 100);
  };

  const edit = (e) => {
    setEditTitle(e.target.value);
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
      <button onClick={(e) => {
        update(editTitle);
        setEditing(false);
      }}><ImCheckmark/></button>
    </TitleContainer>);
  }
};

const Dungeon = ({viewDungeon, setViewDungeon}) => {
  const updateDungeon = (updated) => {
    // send to server
  };

  const updatePlaylist = (isFX, list) => {
    let playlist = isFX ? 'effects' : 'tracks';

    // simplify this later, since server will send back a fresh obj
    let updatedDungeon = {
      id: viewDungeon.id,
      title: viewDungeon.title,
      tracks: viewDungeon.tracks,
      effects: viewDungeon.effects,
      creator: viewDungeon.creator,
      cover: viewDungeon.cover,
    };

    updatedDungeon[playlist] = list;
    setViewDungeon(updatedDungeon);
    updateDungeon(updatedDungeon);
  };

  const updateTitle = (title) => {
    let updatedDungeon = {
      id: viewDungeon.id,
      title: title,
      tracks: viewDungeon.tracks,
      effects: viewDungeon.effects,
      creator: viewDungeon.creator,
      cover: viewDungeon.cover,
    };
    setViewDungeon(updatedDungeon);
    updateDungeon(updatedDungeon);
  };

  return (
    <DungeonContainer>
      <DungeonTitle title={viewDungeon.title} update={updateTitle}/>

      <PlaylistControls dungeon={viewDungeon}/>
      <Playlist updateList={updatePlaylist} playlist={viewDungeon.tracks} viewDungeon={viewDungeon}fx={0}/>
      <Playlist updateList={updatePlaylist} playlist={viewDungeon.effects} viewDungeon={viewDungeon} fx={1}/>
    </DungeonContainer>
  );
};

export default Dungeon;