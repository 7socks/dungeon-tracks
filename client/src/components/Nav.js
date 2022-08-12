import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
  z-index: var(--layer-nav);
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

export default Nav;