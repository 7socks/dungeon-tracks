import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { HiPencil } from 'react-icons/hi';
import { ImCheckmark } from 'react-icons/im';
import { MdDeleteForever } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { setDungeon, setTrack, playPause } from '../app/reducers/audioSlice';
import REQUEST from '../router/router';
import Audio from '../app/audio';

import { PlaylistControls } from './AudioControls';
import Playlist from './Playlist';
import Loader from './Loader';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 100%;
`;

const DungeonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding-bottom: 1em;
  background: var(--theme-bg-mask);

  button:not(.muffle-btn):not(.block-btn):not(.opt-btn) {
    border: none;
    background: none;
    color: var(--theme-btn-text-dim);
    cursor: pointer;

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
    display: inline-flex;

    span {
      visibility: hidden;
    }
    :hover {
      span {
        visibility: visible;
      }
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-height: 2em;

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
    font-weight: bold;
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

  p {
    margin: 0;
    margin-bottom: .5em;
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  button {
    cursor: pointer;
    color: var(--theme-popup-text);
    border: 1px solid var(--theme-popup-text);
    border-radius: .3em;
    width: 5em;
    margin: .2em;
  }

  #del-cancel-btn {
    background: transparent;
    color: var(--theme-btn-text-dim);
    border-color: var(--theme-btn-text-dim);
    :hover {
      color: var(--theme-popup-text);
      border-color: var(--theme-popup-text);
    }
  }

  #del-delete-btn {
    background: var(--theme-btn-bg-warning);
  }

  #del-delete-loader {
    width: 5em;
    margin: .2em;
    border: 1px solid transparent;
  }
`;

const DeletionWindow = ({ confirm, cancel, loading }) => {
  const focusRef = useCallback((element) => {
    element && element.focus();
  }, []);

  return <DeletionContainer
    tabIndex="-1"
    ref={focusRef}
    onBlur={(e) => {
      if (e.relatedTarget && e.relatedTarget.id !== 'del-delete-btn') {
        cancel();
      }
    }}
  >
    <p>Delete this dungeon?<br />This cannot be undone.</p>
    <div>
      { loading
        ? <span id="del-delete-loader"><Loader size="inherit"/></span>
        : <button className="block-btn" id="del-delete-btn" onClick={confirm}>DELETE</button>
      }
      <button className="block-btn" id="del-cancel-btn" onClick={cancel}>CANCEL</button>
    </div>
  </DeletionContainer>
};

const DungeonTitle = ({ title, update, loading }) => {
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
      {
        loading
        ? <Loader size="18px"/>
        : <button onClick={() => setEditing(true)}>
            <HiPencil />
          </button>
      }
    </TitleContainer>;
  } else {
    return (<TitleContainer onBlur={focused ? handleBlur : null}>
      <input type="text" value={editTitle} onChange={edit} autoFocus />
      <button onClick={(e) => {
        update(editTitle);
        setEditing(false);
      }}><ImCheckmark /></button>
    </TitleContainer>);
  }
};

const Dungeon = ({ viewDungeon, setViewDungeon, setPage }) => {
  const [deletion, setDeletion] = useState(false);
  const [loadingDeletion, setLoadingDeletion] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [loadingEffects, setLoadingEffects] = useState(false);

  const playingDungeon = useSelector((state) => state.audio.dungeon);
  const playingTrack = useSelector((state) => state.audio.track);
  const dispatch = useDispatch();

  const refresh = (data) => {
    setViewDungeon(data);
    if (playingDungeon && playingDungeon.id === data.id) {
      var trackIndex = null;
      let trackId = playingDungeon.tracks[playingTrack].id;
      for (var i = 0; i < data.tracks.length; i++) {
        if (data.tracks[i].id === trackId) {
          trackIndex = i;
        }
      }
      if (trackIndex === null) {
        dispatch(setDungeon(null));
        dispatch(playPause(false));
        Audio.clear();
      } else {
        dispatch(setDungeon(data));
        dispatch(setTrack(trackIndex));
        Audio.refreshQueue(data.tracks, trackIndex);
      }
    }
  };

  const deleteDungeon = () => {
    setLoadingDeletion(true);
    REQUEST.deleteDungeon(viewDungeon.id)
      .then(() => {
        setPage(2);
      })
      .catch(() => setDeletion(false))
      .finally(() => setLoadingDeletion(false))
  };

  const removeSound = (isFx, id) => {
    let setLoadingList = isFx ? setLoadingEffects : setLoadingTracks;
    setLoadingList(true);
    REQUEST.removeSoundFromDungeon({
      type: isFx ? 'effects' : 'tracks',
      dungeonId: viewDungeon.id,
      soundId: id
    })
      .then((data) => refresh(data))
      .finally(() => setLoadingList(false))
  };

  const updateDungeon = async (update) => {
    return REQUEST.updateDungeon(update)
      .then((data) => refresh(data));
  };

  const updatePlaylist = (isFX, list) => {
    let setLoadingList = isFX ? setLoadingEffects : setLoadingTracks;
    setLoadingList(true);
    updateDungeon({
      id: viewDungeon.id,
      key: isFX ? 'effects' : 'tracks',
      payload: list
    })
      .finally(() => setLoadingList(false))
  };

  const updateTitle = (title) => {
    setLoadingTitle(true)
    updateDungeon({
      id: viewDungeon.id,
      key: 'title',
      payload: title
    })
      .finally(() => setLoadingTitle(false))
  };

  if (viewDungeon === null) {
    return <PageContainer>
      <Loader/>
    </PageContainer>
  } else {
    return (
      <DungeonContainer>
        <HeaderContainer>
          <DungeonTitle
            title={viewDungeon.title}
            update={updateTitle}
            loading={loadingTitle}
          />

          <button className="del-btn" onClick={() => {
            setDeletion(true);
          }}>
            <span>DELETE DUNGEON</span>
            <MdDeleteForever />
          </button>
          {
            deletion
              ? <DeletionWindow
                loading={loadingDeletion}
                confirm={deleteDungeon}
                cancel={() => setDeletion(false)} />
              : null
          }
        </HeaderContainer>

        <PlaylistControls dungeon={viewDungeon} />
        <Playlist
          loading={loadingTracks}
          updateList={updatePlaylist}
          removeSound={removeSound}
          addSounds={() => setPage(1)}
          playlist={viewDungeon.tracks}
          viewDungeon={viewDungeon}
          fx={0}
        />
        <Playlist
          loading={loadingEffects}
          updateList={updatePlaylist}
          removeSound={removeSound}
          addSounds={() => setPage(1)}
          playlist={viewDungeon.effects}
          viewDungeon={viewDungeon}
          fx={1}
        />
      </DungeonContainer>
    );
  }
};

export default Dungeon;