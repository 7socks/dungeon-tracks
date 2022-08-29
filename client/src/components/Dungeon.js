import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { HiPencil } from 'react-icons/hi';
import { ImCheckmark } from 'react-icons/im';
import { MdDeleteForever } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { setDungeon, setTrack } from '../app/reducers/audioSlice';
import REQUEST from '../router/router';
import Audio from '../app/audio';

import { PlaylistControls } from './AudioControls';
import Playlist from './Playlist';

const DungeonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  button:not(.muffle-btn) {
    border: none;
    background: none;
    color: var(--theme-btn-text-dim);

    :hover {
      color: var(--theme-btn-text-undim);
    }
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.2em 0 1.2em 1em;
  position: relative;

  button {
    font-size: 16px;
  }

  .del-btn {
    margin-right: 2em;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;

  h1 {
    margin: 0;
    font-size: 32px;
  }

  input {
    margin: 0;
    font-size: 32px;
    background: none;
    color: var(--theme-text);
    border: none;
    border-bottom: 2px solid var(--theme-btn-text-undim);
    outline: none;
    font-family: inherit;
  }
`;

const DeletionContainer = styled.div`
  z-index: var(--layer-popup);
  background: var(--theme-popup-bg);
  border: 2px solid var(--theme-popup-border);
  border-radius: 1.5em;
  position: absolute;
  top: 1em;
  right: 1em;
  padding: 1em;
  font-size: 14px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const DeletionWindow = ({confirm, cancel}) => {
  const focusRef = useCallback((element) => {
    element && element.focus();
  }, []);

  return <DeletionContainer tabIndex="-1" ref={focusRef} onBlur={cancel}>
    <p>Delete this dungeon?<br/>This cannot be undone.</p>
    <div>
      <button id="del-cancel-btn" onClick={cancel}>CANCEL</button>
      <button id="del-delete-btn" onClick={confirm}>DELETE</button>
    </div>
  </DeletionContainer>
};

const DungeonTitle = ({title, update}) => {
  const [focused, setFocused] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  useEffect(() => {
    setFocused(editing);
  }, [editing]);

  const handleBlur = () => {
    setTimeout(() => {
      setEditing(false);
    }, 100);
  };

  const edit = (e) => {
    setEditTitle(e.target.value);
  };

  if (!editing) {
    return <TitleContainer>
      <h1>{title}</h1>
      <button onClick={() => setEditing(true)}>
        <HiPencil/>
      </button>
    </TitleContainer>;
  } else {
    return (<TitleContainer onBlur={focused ? handleBlur : null}>
      <input type="text" value={editTitle} onChange={edit} autoFocus/>
      <button onClick={(e) => {
        update(editTitle);
        setEditing(false);
      }}><ImCheckmark/></button>
    </TitleContainer>);
  }
};

const Dungeon = ({viewDungeon, setViewDungeon, setPage}) => {
  const [deletion, setDeletion] = useState(false);
  const playingDungeon = useSelector((state) => state.audio.dungeon);
  const playingTrack = useSelector((state) => state.audio.track);
  const dispatch = useDispatch();

  const deleteDungeon = () => {
    REQUEST.deleteDungeon(viewDungeon.id)
      .then(() => {
        setViewDungeon(null);
        setPage(2);
      });
  };

  const updateDungeon = (update) => {
    REQUEST.updateDungeon(update)
      .then((data) => {
        setViewDungeon(data);
        if (playingDungeon && playingDungeon.id === data.id) {
          var trackIndex = 0;
          let trackId = playingDungeon.tracks[playingTrack].id;
          for (var i = 0; i < data.tracks; i++) {
            if (data.tracks[i].id === trackId) {
              trackIndex = i;
            }
          }
          dispatch(setDungeon(data));
          Audio.playQueue(data.tracks, trackIndex, (i) => {
            dispatch(setTrack(i));
          });
        }
      });
  };

  const updatePlaylist = (isFX, list) => {
    updateDungeon({
      id: viewDungeon.id,
      key: isFX ? 'effects' : 'tracks',
      payload: list
    });
  };

  const updateTitle = (title) => {
    updateDungeon({
      id: viewDungeon.id,
      key: 'title',
      payload: title
    });
  };

  return (
    <DungeonContainer>
      <HeaderContainer>
        <DungeonTitle title={viewDungeon.title} update={updateTitle}/>
        <button className="del-btn" onClick={() => {
          setDeletion(true);
        }}>
          <MdDeleteForever/>
        </button>
        {
          deletion
          ? <DeletionWindow confirm={deleteDungeon} cancel={() => setDeletion(false)}/>
          : null
        }
      </HeaderContainer>

      <PlaylistControls dungeon={viewDungeon}/>
      <Playlist updateList={updatePlaylist} playlist={viewDungeon.tracks} viewDungeon={viewDungeon}fx={0}/>
      <Playlist updateList={updatePlaylist} playlist={viewDungeon.effects} viewDungeon={viewDungeon} fx={1}/>
    </DungeonContainer>
  );
};

export default Dungeon;