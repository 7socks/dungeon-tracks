import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/reducers/userSlice';
import REQUEST from '../router/router';

const NavContainer = styled.div`
  z-index: var(--layer-nav);
  height: 2.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: default;
  padding-bottom: .2em;
  background: var(--theme-nav-bg);

  h1 {
    margin: 0;
    :hover {
      color: var(--theme-text-highlight);
      cursor: pointer;
    }
  }

  div {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  span {
    font-size: 22px;
    color: var(--theme-text);
  }

  span:hover {
    color: var(--theme-text-highlight);
    cursor: pointer;
  }

  .small {
    font-size: 16px;
    margin-right: 1.5em;
  }
`;

const Nav = ({setPage, reset}) => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  const handleLog = () => {
    if (loggedIn) {
      REQUEST.logOut()
        .then(() => {
          dispatch(logout());
          reset();
          setPage(1);
        })
    } else {
      setPage(0);
    }
  };

  return <NavContainer>
    <h1 onClick={() => setPage(4)}>Dungeon Tracks</h1>
    <div>
      <span onClick={() => setPage(1)}>Browse Sounds</span>
      <span onClick={() => setPage(2)}>Your Dungeons</span>

      <span className="small" onClick={handleLog}>
        { loggedIn ? 'Log Out' : 'Log In' }
      </span>
    </div>
  </NavContainer>;
};

export default Nav;