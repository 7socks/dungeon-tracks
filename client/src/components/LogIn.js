import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { login } from '../app/reducers/userSlice';
import REQUEST from '../router/router';

const PageContainer = styled.div`
  z-index: var(--layer-main);
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
    display: grid;
    align-content: center;
  }

  input {
    height: 1.5em;
    border: 1px solid;
    border-radius: .5em;
    padding: .1em .3em;

    :focus {
      outline: 2px solid var(--theme-login-select);
    }
  }

  #input-pwd {
    border-color: ${({pass}) =>
     pass
     ? 'var(--theme-login-error)'
     : 'var(--theme-login-text)'
    };
  }

  #input-usr {
    border-color: ${({user}) =>
      user
      ? 'var(--theme-login-error)'
      : 'var(--theme-login-text)'
    };
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
    display: inline-flex;
    align-items: flex-end;

    span {
      margin: 0 .1em;
    }

    .selector {
      color: var(--theme-login-text-link);
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;

const validateUsername = (username) => {
  return username.length > 2 && username.length < 20;
};

const validatePassword = (password) => {
  return password.length > 5 && password.length <= 25;
}

const LogIn = ({setPage}) => {
  const dispatch = useDispatch();
  const [existing, setExisting] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUser, setErrorUser] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

  useEffect(() => {
    setUsername('');
    setPassword('');
    setErrorUser(false);
    setErrorPass(false);
  }, [existing]);

  useEffect(() => {
    if (!existing) {
      errorUser && setErrorUser(!validateUsername(username));
      errorPass && setErrorPass(!validatePassword(password));
    }
  }, [username, password]);

  const signIn = () => {
    var validUser = validateUsername(username);
    var validPass = validatePassword(password);
    if (validUser && validPass) {
      REQUEST.logIn({username, password})
        .then((success) => {
          if (success) {
            dispatch(login());
            setPage(2);
          } else {
            setErrorUser(true);
            setErrorUser(false);
          }
        })
    } else {
      setErrorUser(true);
      setErrorPass(true);
    }
  };

  const signUp = () => {
    var validUser = validateUsername(username);
    var validPass = validatePassword(password);
    if (validUser && validPass) {
      REQUEST.createUser({username, password})
        .then((success) => {
          if (success) {
            dispatch(login());
            setPage(2);
          } else {
            // error msg to user
            setErrorUser(true);
          }
        })
    } else {
      setErrorUser(!validUser);
      setErrorPass(!validPass);
    }
  };

  return (
    <PageContainer><LogInContainer user={errorUser} pass={errorPass}>
      <label>
        <span>Username</span>
        <input id="input-usr" type="text" value={username} onChange={(e) => {
          setUsername(e.target.value);
        }}/>
      </label>

      <label>
        <span>Password</span>
        <input id="input-pwd" type={existing ? 'password' : 'text'} value={password} onChange={(e) => {
          setPassword(e.target.value);
        }}/>
      </label>

      <button onClick={existing ? signIn : signUp}>
        {existing ? 'Log In' : 'Sign Up'}
      </button>

      <div className="login-toggle">
        <span className="login-toggle">
          {existing ? 'New?' : 'Already have an account?'}
        </span>
        <span
          className="selector"
          onClick={() => setExisting(!existing)}
        >
          {existing ? 'Create an account' : 'Log in'}
        </span>
      </div>
    </LogInContainer></PageContainer>
  );
}

export default LogIn;