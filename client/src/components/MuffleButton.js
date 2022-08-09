import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: none;
  color: var(--theme-btn-text-undim);
  border: 2px solid var(--theme-btn-text-undim);
  border-radius: .5em;
  font-size: 18px;

  :hover {
    color: var(--theme-text);
    border-color: var(--theme-text);
  }

  ${({muffled}) =>
    muffled
    ? 'color: var(--theme-text-highlight);'
    : null
  }
`;

const MuffleButton = ({muffled, onClick}) => (
  <StyledButton className="muffle-btn"
    muffled={muffled}
    onClick={onClick}
  >
  Muffle
  </StyledButton>
);

export default MuffleButton;