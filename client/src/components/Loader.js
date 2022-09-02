import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters as AiLoading } from 'react-icons/ai';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.span`
  display: grid;
  justify-content: center;
  align-content: center;
  animation: 1.5s ${spin} infinite;
  font-size: ${({size}) => size ? size : '32px'};
  color: var(--theme-loader-color);
`;

const Loader = ({size}) => (
  <LoaderContainer size={size}><AiLoading/></LoaderContainer>
);

export default Loader;