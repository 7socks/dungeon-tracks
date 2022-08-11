import React, { useState } from 'react';
import styled from 'styled-components';
import { ImCheckmark, ImCross } from 'react-icons/im';
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

const COLORS = ['green', 'teal', 'blue', 'orange', 'red', 'pink'];

const IconContainer = styled.span`
  height: 2em;
  width: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-radius: 50%;
  background: var(--icon-color-${({color}) => color});
  color: ${({playing}) =>
    playing
    ? 'var(--theme-list-text-selected)'
    : '#fff'
  };
`;

const FXIconEditorContainer = styled.div`
  position: absolute;
  top: 2.5em;
  display: flex;
  flex-direction: column;
  background: var(--theme-bg);
  font-size: 18px;
  padding: .5em;
  border: 2px solid black;
  border-radius: 1.5em;
  width: 15em;
  height: 10em;
  z-index: 10;
  overflow-y: scroll;
  justify-content: center;
`;

const PickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${({type}) =>
    type === 'color'
    ? 'justify-content: space-evenly; align-items: center;'
    : null
  }

  span {
    display: flex;
    height: 1.5em;
    width: 1.5em;
    justify-content: center;
    align-items: center;
  }
`;

const ColorInput = styled.span`
  background: var(--icon-color-${({color}) => color});
  border-radius: 50%;
  margin: 0;
  border: ${({selected}) =>
    selected
    ? '2px solid #fff'
    : '1px solid #fff'
  };
  justify-self: center;
`;

const IconInput = styled.span`
  color: ${({selected}) =>
    selected
    ? 'var(--theme-text-highlight)'
    : 'var(--theme-text)'
  };
`;

const CancelConfirmContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    background: none;
    border: none;
    width: fit-content;
  }

  button:hover {
    color: #fff;
  }

  .edit-btn-confirm {
    color: #65FF62;
    font-size: 17px;
  }

  .edit-btn-cancel {
    color: #FF4364;
  }
`;

const FXIconEditor = ({effect, onCancel, onConfirm}) => {
  const [icon, setIcon] = useState(effect.icon);
  const [color, setColor] = useState(effect.color);

  const confirm = (e) => {
    e.stopPropagation();
    onConfirm(icon, color);
  };

  return <FXIconEditorContainer>
    <PickerContainer type="color">
      {COLORS.map((opt) => {
        return <ColorInput
          key={opt} onClick={() => setColor(opt)}
          color={opt} selected={color === opt}
        />
      })}
    </PickerContainer>
    <PickerContainer type="icon">
      {Object.keys(ICONS).map((opt) => {
        return <IconInput
          key={opt} onClick={() => setIcon(opt)}
          selected={icon === opt}
        >
          {ICONS[opt]}
        </IconInput>
      })}
    </PickerContainer>
    <CancelConfirmContainer>
      <button className="edit-btn-cancel" onClick={onCancel}>
        <ImCross />
      </button>
      <button className="edit-btn-confirm" onClick={confirm}>
        <ImCheckmark />
      </button>
    </CancelConfirmContainer>
  </FXIconEditorContainer>;
};

const FXIcon = ({playing, icon, color, onClick}) => {
  return <IconContainer playing={playing} color={color} onClick={onClick}>
    {ICONS[icon]}
  </IconContainer>;
};

export { FXIcon, FXIconEditor}