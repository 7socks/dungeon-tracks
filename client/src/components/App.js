import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import Audio from '../app/audio';

import Nav from './Nav';
import Home from './Home';
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
  const [viewDungeon, setViewDungeon] = useState(null);
  const [page, setPage] = useState(4);

  useEffect(() => {
    // Stop sample audio upon leaving search page
    page !== 1 && Audio.stopSample();
  }, [page]);

  return (
    <AppContainer>
      <Nav setPage={setPage} reset={() => {
        setDungeonList([])
        setViewDungeon(null);
      }}/>

      {page === 0 && <LogIn setPage={setPage}/>}
      {page === 1 && <Search/>}
      {page === 2 && <DungeonList
        dungeonList={dungeonList}
        setDungeonList={setDungeonList}
        setViewDungeon={setViewDungeon}
        setPage={setPage}
      />}
      {page === 3 && <Dungeon
        viewDungeon={viewDungeon}
        setViewDungeon={setViewDungeon}
        setPage={setPage}
      />}
      {page === 4 && <Home/>}

      <ControlBar
        setPage={setPage}
        setViewDungeon={setViewDungeon}
      />
    </AppContainer>
  );
};

export default App;