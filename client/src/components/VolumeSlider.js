import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.span`
  display: inline-grid;
  grid-template-columns: ${(vol) => vol * 100}%, auto;
  position: relative;
  height: .5em;
  width: 8em;

  input {
    position: absolute;
  }

  .slider-left {
    background-color: var(--theme-slider-full);
  }

  .slider-right {
    background-color: var(--theme-slider-empty);
  }
`;

const VolumeSlider = ({volume, setVolume}) => {
  const [value, setValue] = useState(volume);

  useEffect(() => {
    setVolume(value);
  }, [value]);

  return <SliderContainer vol={Number(value)}>
    <input
        type="range"
        step=".05"
        min="0"
        max="1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
    />
    <span className="slider-left"></span>
    <span className="slider-right"></span>
  </SliderContainer>
};

export default VolumeSlider;