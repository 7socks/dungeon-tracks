import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import REQUEST from '../router/router';

const MsgContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  overflow-y: scroll;
  height: 100%;
`;

const DungeonContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 6em;
  width: 10em;
  color: var(--theme-dungeoncard-text);
  background: var(--theme-dungeoncard-bg);
  border-radius: 1em;
  cursor: pointer;
  margin: .5em;

  :hover {
    color: var(--theme-dungeoncard-text-highlight);
  }
`;

const CreateContainer = styled(DungeonContainer)`
  box-sizing: border-box;
  background: transparent;
  border: 2px dashed var(--theme-btn-text-dim);
  color: var(--theme-btn-text-dim);

  :hover {
    border-color: var(--theme-btn-text-undim);
    color: var(--theme-btn-text-undim);
  }

  span {
    display: grid;
    font-size: 36px;
  }
`;

const DungeonList = ({setViewDungeon, dungeonList, setDungeonList, setPage}) => {
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

  const selectDungeon = (id) => {
    REQUEST.getDungeon(id)
      .then((data) => {
        setViewDungeon(data);
        setPage(3);
      });
  };

  if (loggedIn) {
    return <ListContainer>
    {dungeonList.map((dungeon, i) => {
      return <DungeonContainer key={i} onClick={() => selectDungeon(dungeon.id)}>
        <span>{dungeon.title}</span>
      </DungeonContainer>;
    })}
    <CreateContainer onClick={handleCreate}><span><FaPlus/></span></CreateContainer>
  </ListContainer>
  } else {
    return <MsgContainer>
      <span>Log in to view or create your dungeons!</span>
    </MsgContainer>
  }

};

export default DungeonList;