import React, { useState } from 'react';
import styled from 'styled-components';

import { PlaylistControls } from './AudioControls';
import Playlist from './Playlist';

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

const DungeonTitle = ({title, update}) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const edit = (e) => {
    setEditTitle(e.target.value);
  };

  if (!editing) {
    return <h1>{title}</h1>
  } else {
    return (<div>
      <input type="text" value={editTitle} onChange={edit}/>
      <button onClick={() => {
        setEditing(false);
        update(editTitle);
      }}>V</button>
      <button onClick={() => {
        setEditing(false);
      }}>X</button>
    </div>);
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
    viewDungeon[playlist] = list;
  };

  return (
    <DungeonContainer>
      <DungeonTitle title={viewDungeon.title} update={() => {}}/>

      <PlaylistControls dungeon={viewDungeon}/>
      <Playlist updateList={updatePlaylist} playlist={viewDungeon.tracks} fx={0}/>
      <Playlist updateList={updatePlaylist} playlist={viewDungeon.effects} fx={1}/>
    </DungeonContainer>
  );
};

export default Dungeon;