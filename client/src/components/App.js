import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Search from './Search';
import Dungeon from './Dungeon';
import DungeonList from './DungeonList';
import { ControlBar } from './AudioControls';

const NavContainer = styled.div`
  height: 2.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: default;

  h1 {
    margin: 0;
  }

  div {
    width: 50%;
    display: flex;
    justify-content: space-around;
  }

  span {
    font-size: 22px;
    color: var(--theme-text);
  }

  span:hover {
    color: var(--theme-text-highlight);
  }
`;

const Nav = ({setPage}) => {
  return <NavContainer>
    <h1>Dungeon Tracks</h1>
    <div>
      <span onClick={() => setPage(1)}>Browse Sounds</span>
      <span onClick={() => setPage(2)}>Your Dungeons</span>
    </div>
  </NavContainer>;
};

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const App = () => {
  const selectedDungeon = useSelector((state) => state.audio.dungeon);
  const [viewDungeon, setViewDungeon] = useState(selectedDungeon);
  const [page, setPage] = useState(3);

  return (
    <AppContainer>
      <Nav setPage={setPage}/>

      {page === 1 && <Search/>}
      {page === 2 && <DungeonList setViewDungeon={setViewDungeon}/>}
      {page === 3 && <Dungeon viewDungeon={viewDungeon} setViewDungeon={setViewDungeon}/>}

      <ControlBar/>
    </AppContainer>
  );
};

export default App;