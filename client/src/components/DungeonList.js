import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import REQUEST from '../router/router';

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

const DungeonList = ({setViewDungeon, dungeonList, setDungeonList}) => {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  useEffect(() => {
    REQUEST.getDungeons()
      .then((data) => {
        setDungeonList(data);
      })
  }, []);

  const handleCreate = () => {
    REQUEST.createDungeon({
      title: 'Untitled Dungeon'
    })
      .then((data) => {
        setDungeonList(data);
      })
  };

  return <ListContainer>
    {dungeonList.map((dungeon, i) => {
      return <DungeonContainer key={i} onClick={() => setViewDungeon(dungeon)}>
        <div><span>{dungeon.title}</span></div>
      </DungeonContainer>;
    })}
    {
      loggedIn
      ? <div onClick={handleCreate}><FaPlus/></div>
      : <span>Log in to view or create your dungeons!</span>
    }
  </ListContainer>
};

export default DungeonList;