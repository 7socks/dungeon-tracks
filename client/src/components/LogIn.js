import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { logIn, createUser } from '../router/router';

const PageContainer = styled.div`
  z-index: var(--layer-main);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LogInContainer = styled.div`
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--theme-login-bg);
  color: var(--theme-login-text);
  width: 25em;
  padding: 1.5em 1em;
  border-radius: 1em;

  span {
    cursor: default;
  }

  input {
    height: 1.5em;
    border: 1px solid var(--theme-login-text);
    border-radius: .5em;
    padding: .1em .3em;

    :focus {
      outline: 2px solid var(--theme-login-text-highlight);
    }
  }

  label {
    font-weight: 700;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    margin: .5em 0;

    * {
      margin: 0 0 .2em 0;
    }
  }

  button {
    background: var(--theme-login-btn-bg);
    color: var(--theme-login-btn-text);
    font-size: 18px;
    font-family: inherit;
    margin: .5em 0;
    border: none;
    border-radius: .5em;
    padding: .3em .5em;
    cursor: pointer;

    :hover {
      background: var(--theme-login-btn-bg-hover);
    }
  }

  .login-toggle {
    margin-top: 1em;
    font-size: 14px;
    color: var(--theme-login-text-plain);

    .selector {
      color: var(--theme-login-text);
      cursor: pointer;
      :hover {
        color: var(--theme-login-text-highlight);
      }
    }
  }
`;

const LogIn = () => {
  const [existing, setExisting] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {

  };

  const signUp = () => {
    // form validation


  };

  return (
    <PageContainer><LogInContainer>
      <label>
        <span>Username</span>
        <input type="text" value={username} onChange={(e) => {
          setUsername(e.target.value);
        }}/>
      </label>

      <label>
        <span>Password</span>
        <input type="password" value={password} onChange={(e) => {
          setPassword(e.target.value);
        }}/>
      </label>

      <button onClick={existing ? signIn : signUp}>
        {existing ? 'Log In' : 'Sign Up'}
      </button>

      <div className="login-toggle">
        {
          existing
          ? <span>New?  </span>
          : <span>Already have an account?  </span>
        }
        <span
          className="login-toggle selector"
          onClick={() => setExisting(!existing)}
        >
          {existing ? 'Create an account' : 'Log in'}
        </span>
      </div>
    </LogInContainer></PageContainer>
  );
}

export default LogIn;