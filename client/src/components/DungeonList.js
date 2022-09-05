import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import REQUEST from '../router/router';
import Loader from './Loader';

const MsgContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
  cursor: default;

  div {
    display: flex;
    flex-direction: row;
    justify-content: baseline;

    span {
      margin: 0 .2em;
    }
  }

  .hover-text {
    color: var(--theme-text-highlight);
    cursor: pointer;

    :hover {
      color: var(--theme-text)
      text-decoration: underline;
    }
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-content: start;
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
  const [loading, setLoading] = useState(loggedIn);
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    loggedIn && REQUEST.getDungeons()
      .then((data) => {
        setLoading(false);
        setDungeonList(data);
      })
  }, []);

  const handleCreate = () => {
    setLoadingCreate(true);
    REQUEST.createDungeon({
      title: 'Untitled Dungeon'
    })
      .then((data) => {
        setDungeonList(data);
        setLoadingCreate(false);
      })
  };

  const selectDungeon = (id) => {
    setViewDungeon(null);
    setPage(3);
    REQUEST.getDungeon(id)
      .then((data) => {
        setViewDungeon(data);
      });
  };

  if (loading) {
    return <MsgContainer>
      <Loader/>
    </MsgContainer>
  } else if (loggedIn) {
    return <ListContainer>
    {dungeonList.map((dungeon, i) => {
      return <DungeonContainer key={i} onClick={() => selectDungeon(dungeon.id)}>
        <span>{dungeon.title}</span>
      </DungeonContainer>
    })}
    {
      loadingCreate
      ? <CreateContainer><span><Loader/></span></CreateContainer>
      : <CreateContainer onClick={handleCreate}><span><FaPlus/></span></CreateContainer>
    }
  </ListContainer>
  } else {
    return <MsgContainer>
      <div>
        <span className="hover-text" onClick={() => setPage(0)}>Log in </span>
        <span>to view or create your dungeons!</span>
      </div>
    </MsgContainer>
  }

};

export default DungeonList;