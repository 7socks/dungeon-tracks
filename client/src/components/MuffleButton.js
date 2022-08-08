import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: none;
  color: var(--theme-text);
  border: 2px solid var(--theme-text);
  border-radius: .5em;
  font-size: 18px;

  :hover {
    color: var(--theme-text-highlight);
    border-color: var(--theme-text-highlight);
  }

  ${({muffled}) =>
    muffled
    ? 'color: var(--theme-btn-text-undim);'
    : null
  }
`;

const MuffleButton = ({muffled, onClick}) => (
  <StyledButton
    muffled={muffled}
    onClick={onClick}
  >
  Muffle
  </StyledButton>
);

export default MuffleButton;