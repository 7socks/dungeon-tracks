import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Nav from './Nav';
import LogIn from './LogIn';
import Search from './Search';
import Dungeon from './Dungeon';
import DungeonList from './DungeonList';
import { ControlBar } from './AudioControls';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const App = () => {
  const selectedDungeon = useSelector((state) => state.audio.dungeon);
  const [dungeonList, setDungeonList] = useState([]);
  const [viewDungeon, setViewDungeon] = useState(selectedDungeon);
  const [page, setPage] = useState(1);

  return (
    <AppContainer>
      <Nav setPage={setPage}/>

      {page === 0 && <LogIn setPage={setPage}/>}
      {page === 1 && <Search/>}
      {page === 2 && <DungeonList
        dungeonList={dungeonList}
        setDungeonList={setDungeonList}
        setViewDungeon={setViewDungeon}
      />}
      {page === 3 && <Dungeon viewDungeon={viewDungeon} setViewDungeon={setViewDungeon}/>}

      <ControlBar/>
    </AppContainer>
  );
};

export default App;