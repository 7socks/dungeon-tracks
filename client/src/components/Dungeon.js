import React, { useState } from 'react';
import styled from 'styled-components';

import { FXIcon, FXIconEditor } from './FXIcon';

const AudioControlContainer = styled.div`
  width: 30%;
`;

const AudioControl = ({}) => {
  return <AudioControlContainer>
  </AudioControlContainer>;
}

const PlaylistContainer = styled.div`
  width: ${({fx}) => fx ? '30' : '40'}%;
  cursor: default;

  ol {
    list-style-type: none;
    padding-inline-start: 0;
    font-size: 16px;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .2em 0;
    position: relative;

    span {
      margin-left: .5em;
    }
  }
`;

const Playlist = ({playlist, fx, updateIcon}) => {
  const [editIcon, setEditIcon] = useState(null);

  return (
    <PlaylistContainer fx={fx}><ol>
      {
        playlist.map((track, i) => {
          return <li key={i}>
            { fx ? <FXIcon icon={track.icon} color={track.color} onClick={()=>{}}/> : null }
            <span>{track.title}</span>
            { fx ? <button onClick={() => setEditIcon(editIcon !== null ? null : i)}>Edit</button> : null }
            {
              i === editIcon
              ? <FXIconEditor
                  effect={track}
                  onConfirm={()=>{}}
                  onCancel={() => editIcon(null)}
                />
              : null
            }
          </li>;
        })
      }
    </ol></PlaylistContainer>
  );
};

const DungeonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  h1 {
    width: 100%;
  }
`;

const Dungeon = ({dungeon}) => {

  return (
    <DungeonContainer>
      <h1>{dungeon.title}</h1>

      <AudioControl/>
      <Playlist playlist={dungeon.tracks} fx={0}/>
      <Playlist playlist={dungeon.effects} fx={1}/>
    </DungeonContainer>
  );
};

export default Dungeon;