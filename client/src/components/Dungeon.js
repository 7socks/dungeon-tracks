import React, { useState } from 'react';
import styled from 'styled-components';

const AudioControlContainer = styled.div`
  width: 30%;
`;

const AudioControl = ({}) => {
  return <AudioControlContainer>

  </AudioControlContainer>;
}

const PlaylistContainer = styled.div`
  width: ${({fx}) => fx ? '30' : '40'}%;

  ol {
    list-style-type: none;
    padding-inline-start: 0;
  }
`;

const Playlist = ({playlist, fx}) => {
  return (
    <PlaylistContainer fx={fx}><ol>
      {
        playlist.map((track, i) => {
          return <li key={i}>
            {fx ? <span>ICON</span> : null}
            <span>{track.title}</span>
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
      <Playlist playlist={dungeon.tracks} fx={false}/>
      <Playlist playlist={dungeon.effects} fx={true}/>
    </DungeonContainer>
  );
};

export default Dungeon;