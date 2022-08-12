import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DungeonContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 2em;
  width: 3em;
`;

const DungeonList = ({setViewDungeon}) => {
  let dungeons = [{title: 'DragonLair'}];

  return <ListContainer>
    {dungeons.map((dungeon, i) => {
      return <DungeonContainer key={i} onClick={() => setViewDungeon(dungeon)}>
        <span>{dungeon.title}</span>
      </DungeonContainer>;
    })}
  </ListContainer>
};

export default DungeonList;