import React from 'react';
import styled from 'styled-components';
import {
  GiBeech, GiBrute, GiCat, GiCharm, GiCrossbow, GiCurledTentacle,
  GiCurlyWing, GiDelighted, GiDeathSkull, GiDoubleQuaver, GiDrakkar,
  GiDread, GiFallingBlob, GiFlamer, GiGavel, GiGooeyDaemon,
  GiHeatHaze, GiHighShot, GiHound, GiJesterHat, GiLightningTrio,
  GiLyre, GiPaperBomb, GiPointyHat, GiPointySword, GiRaining,
  GiRollingEnergy, GiSnake, GiSnowflake1, GiSpiderAlt,
  GiSpikedDragonHead, GiSpikyExplosion, GiSpiralBottle,
  GiSpottedMushroom, GiSwordman, GiWaterSplash
} from 'react-icons/gi';

const icons = {
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
  scream: <GiDread/>,
  ship: <GiDrakkar/>,
  meteor: <GiFallingBlob/>,
  flame: <GiFlamer/>,
  hammer: <GiGavel/>,
  demon: <GiGooeyDaemon/>,
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

const FXIcon = ({icon, color, onClick}) => {
  return <IconContainer color={color} onClick={onClick}>
    {icons[icon]}
  </IconContainer>;
};

export default FXIcon;