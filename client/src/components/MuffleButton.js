import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { muffle } from '../app/reducers/audioSlice';
import Audio from '../app/audio';

const StyledButton = styled.button`
  padding: .2em;
  border: none;
  border-radius: .5em;
  font-family: var(--theme-font-thin);
  font-size: 18px;
  cursor: pointer;

  ${({muffled}) => {
    if (muffled) {
      return `
        background: var(--theme-btn-bg-dark);
        color: var(--theme-btn-text-undim);
      `;
    } else {
      return `
        background: var(--theme-btn-bg-light);
        color: var(--theme-text);
      `;
    }
  }}
`;

const MuffleButton = () => {
  const muffled = useSelector((state) => state.audio.muffled);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(muffle());
    Audio.muffle();
  }

  return (<StyledButton className="muffle-btn"
    muffled={muffled}
    onClick={handleClick}
  >MUFFLE
  </StyledButton>);
};

export default MuffleButton;