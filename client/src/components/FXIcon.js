import React, { useState } from 'react';
import styled from 'styled-components';
import {
  GiBeech, GiBrute, GiCat, GiCharm, GiCrossbow, GiCurledTentacle,
  GiCurlyWing, GiDelighted, GiDeathSkull, GiDoubleQuaver, GiDrakkar,
  GiFallingBlob, GiFlamer, GiGavel, GiHeatHaze, GiHighShot, GiHound,
  GiJesterHat, GiLightningTrio, GiLyre, GiPaperBomb, GiPointyHat,
  GiPointySword, GiRaining, GiRollingEnergy, GiSnake, GiSnowflake1,
  GiSpiderAlt, GiSpikedDragonHead, GiSpikyExplosion, GiSpiralBottle,
  GiSpottedMushroom, GiSwordman, GiWaterSplash
} from 'react-icons/gi';

const ICONS = {
  dragon: <GiSpikedDragonHead/>,
  tree: <GiBeech/>,
  enemy: <GiBrute/>,
  cat: <GiCat/>,
  hearts: <GiCharm/>,
  crossbow: <GiCrossbow/>,
  octo: <GiCurledTentacle/>,
  wing: <GiCurlyWing/>,
  evil: <GiDelighted/>,
  skull: <GiDeathSkull/>,
  music: <GiDoubleQuaver/>,
  ship: <GiDrakkar/>,
  meteor: <GiFallingBlob/>,
  flame: <GiFlamer/>,
  hammer: <GiGavel/>,
  smoke: <GiHeatHaze/>,
  archery: <GiHighShot/>,
  dog: <GiHound/>,
  jester: <GiJesterHat/>,
  lightning: <GiLightningTrio/>,
  lyre: <GiLyre/>,
  bomb: <GiPaperBomb/>,
  hat: <GiPointyHat/>,
  sword: <GiPointySword/>,
  rain: <GiRaining/>,
  spiral: <GiRollingEnergy/>,
  snake: <GiSnake/>,
  snow: <GiSnowflake1/>,
  spider: <GiSpiderAlt/>,
  bang: <GiSpikyExplosion/>,
  potion: <GiSpiralBottle/>,
  shroom: <GiSpottedMushroom/>,
  fighter: <GiSwordman/>,
  splash: <GiWaterSplash/>
};

const COLORS = ['green'];

const IconContainer = styled.span`
  height: 2em;
  width: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-radius: 50%;
  background: var(--icon-color-${({color}) => color});
  color: #fff;
`;

const FXIconEditorContainer = styled.div`
  position: absolute;
  top: 2.5em;
  display: flex;
  flex-direction: column;
  background: var(--theme-list-bg);
  font-size: 18px;
  padding: .5em;
  border: 2px solid black;
  border-radius: 1.5em;
  width: 15em;
  height: 10em;
  z-index: 10;
  overflow-y: scroll;
`;

const PickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  span {
    display: flex;
    height: 1.5em;
    width: 1.5em;
  }
`;

const ColorInput = styled.span`
  background: var(--icon-color-${({color}) => color});
  border-radius: 50%;
  margin-bottom: .5em;
  border: ${({selected}) =>
    selected
    ? '2px solid #fff'
    : 'none'
  };
`;

const IconInput = styled.span`
  color: ${({selected}) =>
    selected
    ? 'var(--theme-text-highlight)'
    : 'var(--theme-text)'
  };
`;


const FXIconEditor = ({effect, onCancel, onConfirm}) => {
  const [icon, setIcon] = useState(effect.icon);
  const [color, setColor] = useState(effect.color);

  return <FXIconEditorContainer>
    <PickerContainer>
      {COLORS.map((opt) => {
        return <ColorInput
          key={opt} onClick={() => setColor(opt)}
          color={opt} selected={color === opt}
        />
      })}
    </PickerContainer>
    <PickerContainer>
      {Object.keys(ICONS).map((opt) => {
        return <IconInput
          key={opt} onClick={() => setIcon(opt)}
          selected={icon === opt}
        >
          {ICONS[opt]}
        </IconInput>
      })}
    </PickerContainer>
  </FXIconEditorContainer>;
};

const FXIcon = ({icon, color, onClick}) => {
  return <IconContainer color={color} onClick={onClick}>
    {ICONS[icon]}
  </IconContainer>;
};

export { FXIcon, FXIconEditor}