import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.span`
  display: inline-grid;
  grid-template-columns: ${({left, right}) => left + '% ' + right}%;
  position: relative;
  height: .4em;
  width: 8em;
  cursor: pointer;

  input {
    position: absolute;
    top: -50%;
    margin: 0;
    height: 1em;
  }

  .slider-left {
    background-color: var(--theme-slider-full);
    border-radius: ${({left}) =>
      left == 100
      ? '.2em'
      : '.2em 0 0 .2em'
    };
  }

  .slider-right {
    background-color: var(--theme-slider-empty);
    border-radius: ${({right}) =>
      right == 100
      ? '.2em'
      : '0 .2em .2em 0'
    };
  }
`;

const VolumeSlider = ({volume, setVolume}) => {
  const [value, setValue] = useState(volume);

  // useEffect(() => {
  //   setVolume(value);
  // }, [value]);

  return <SliderContainer
    left={Number(value) * 100}
    right={100 - Number(value) * 100}
  >
    <div className="slider-left"></div>
    <div className="slider-right"></div>
    <input
        type="range"
        step=".05"
        min="0"
        max="1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
    />
  </SliderContainer>
};

export default VolumeSlider;