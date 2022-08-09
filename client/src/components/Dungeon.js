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