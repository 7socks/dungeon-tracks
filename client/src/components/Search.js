import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaSearch, FaPlay, FaStop, FaPlus, FaMinus } from 'react-icons/fa';
import { AiOutlineLoading3Quarters as AiLoading } from 'react-icons/fa';
import { MdPlaylistAdd } from 'react-icons/md';
import Audio from '../app/audio';

import { useSelector, useDispatch } from 'react-redux';
import { playPause } from '../app/reducers/audioSlice';

import REQUEST from '../router/router';
import Loader from './Loader';

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.2em;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  input[type="text"] {
    border: 2px solid var(--theme-search-bar-border);
    background: var(--theme-search-bar-bg);
    color: var(--theme-search-bar-text);
    height: 2em;
    width: 30em;
    font-size: 18px;
    padding: 0 1em;
    border-radius: 1em 0 0 1em;

    :focus {
      outline: var(--theme-search-bar-outline);
    }
  }

  button {
    border: 2px solid var(--theme-search-go-border);
    border-left: none;
    background: var(--theme-search-go-bg);
    color: var(--theme-search-go-text);
    border-radius: 0 1em 1em 0;
    padding: 0 .5em;
    font-size: 18px;

    :hover {
      background: var(--theme-search-go-bg-hover);
    }
  }
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  justify-items: center;
  width: 80%;
`;

const ResultListContainer = styled.ul`
  list-style-type: none;
  width: 100%;
  padding: 0;
  padding-right: 1.2em;
  cursor: default;

  p {
    color: var(--theme-btn-text-undim);
  }
`;

const ResultItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 2em;
  color: ${({ playing }) =>
    playing
      ? 'var(--theme-list-text-selected)'
      : 'var(--theme-btn-text-undim)'
  };

  span.play-icon {
    visibility: ${({ playing }) => playing ? 'visible' : 'hidden'};
    color: var(--theme-text);
    position: absolute;
    left: -1.5em;
  }

  #btn-add-to-dungeon {
    position: relative;
    visibility: hidden;
    border: none;
    background: none;
    color: var(--theme-btn-text-dim);
    font-size: 24px;
    display: grid;
    justify-content: center;
    align-content: center;

    :hover {
      color: var(--theme-btn-text-undim);
    }
  }

  :hover {
    color: ${({ playing }) =>
    playing
      ? 'var(--theme-list-text-selected)'
      : 'var(--theme-text)'
  };

    .play-icon {
      visibility: visible;
    }

    #btn-add-to-dungeon {
      visibility: visible;
    }
  }
`;

const ListHeader = styled.span`
  font-size: 20px;
  text-transform: uppercase;
  color: var(--theme-btn-text-dim);
  justify-self: center;
  margin: .5em 0;
`;

const DungeonsListContainer = styled.div`
  z-index: var(--layer-popup);
  position: absolute;
  top: 2em;
  left: 0;
  width: 15em;
  height: 18em;
  font-size: 14px;
  overflow: scroll;
  scroll-padding: .5em;
  background: var(--theme-popup-bg);
  color: var(--theme-popup-text);
  border: 1px solid var(--theme-popup-border);
  border-radius: 1em;
  font-family: var(--theme-font-thin);
  font-weight: 300;

  ul {
    margin: .5em;
    padding: 0;
  }

  li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: .1em 0;


    :hover {
      background: var(--theme-list-bg-highlight);

      .toggle-icon {
        visibility: visible;
      }

      .title {
        margin-left: .1em;
      }
    }
  }

`;

const ToggleIcon = styled.span`
  display: none;
  visibility: ${({ on }) => on ? 'visible' : 'hidden'};
  color: var(--theme-btn-text-undim);
`;

const DungeonsList = ({ sound, type, list, data, refresh, closePopup}) => {
  const [selected, setSelected] = useState(null);
  const [loadState, setLoadState] = useState(false);
  const [loadingDungeon, setLoadingDungeon] = useState(null);
  const focusRef = useCallback((element) => {
    element && element.focus();
  }, []);

  const addSound = (dungeon) => {
    setLoadState(true);
    setLoadingDungeon(dungeon.id);
    REQUEST.addSoundToDungeon({
      dungeonId: dungeon.id,
      soundId: sound.id,
      type: type
    })
      .then(() => {
        setLoadState(false);
        setLoadingDungeon(null);
        refresh();
      })
  };

  return <DungeonsListContainer
      tabIndex="-1"
      ref={focusRef}
      onBlur={closePopup}
    >
    <ul>
      {
        list.map((dungeon, i) => {
          let added = data[dungeon.id][type].includes(sound.id);
          if (added) return null;

          let optionIcon = null;
          if (loadState && loadingDungeon === dungeon.id) {
            optionIcon = <Loader size="14px"/>
          } else if (selected === i) {
            optionIcon = <FaPlus/>
          }

          return <li
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              addSound(dungeon);
            }}
            onMouseOver={() => setSelected(i)}
            onMouseOut={() => setSelected(null)}
          >
            { optionIcon }
            <span className="title">{dungeon.title}</span>
          </li>;
        })
      }
    </ul>
  </DungeonsListContainer>
};

const ResultList = ({ playingSample, playSound, results, type, loading, dungeons, dungeonData, refresh }) => {
  const [addingSound, setAddingSound] = useState(null);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (loading) {
    return <ResultListContainer>
      <ListHeader>{type}</ListHeader>
      <ResultItem><Loader size='20px' /></ResultItem>
    </ResultListContainer>
  }

  return <ResultListContainer>
    <ListHeader>{type}</ListHeader>
    {results.map((item, i) => {
      return <ResultItem
        key={i}
        playing={playingSample === type + '-' + i}
        onClick={() => playSound(item, i, type)}
      >
        <span className="play-icon">
          {playingSample === type + '-' + i ? <FaStop /> : <FaPlay />}
        </span>
        <span>{item.title}</span>
        {
          loggedIn &&
          <button
            id="btn-add-to-dungeon"
            onClick={(e) => {
              e.stopPropagation();
              setAddingSound(i)
            }}
          >
            <MdPlaylistAdd />
          </button>
        }
        {
          addingSound === i &&
            <DungeonsList
              sound={item}
              type={type}
              list={dungeons}
              data={dungeonData}
              refresh={refresh}
              closePopup={() => setAddingSound(null)}
            />
        }
      </ResultItem>
    })}
    {results.length === 0 && <p>No matching {type} found.</p>}
  </ResultListContainer>;
};

const Search = () => {
  const [term, setTerm] = useState('');
  const [trackResults, setTrackResults] = useState([]);
  const [fxResults, setFxResults] = useState([]);
  const [playingSample, setPlayingSample] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dungeons, setDungeons] = useState([]);
  const [dungeonData, setDungeonData] = useState({});

  const playingTrack = useSelector((state) => state.audio.playing);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    refreshDungeons();
    return () => setDungeons([])
  }, []);

  useEffect(() => {
    if (loggedIn && dungeons) {
      Promise.all(dungeons.map((dungeon) => {
        return new Promise((resolve, reject) => {
          REQUEST.getDungeon(dungeon.id)
            .then(({id, effects, tracks}) => {
              resolve({id, effects, tracks})
            })
            .catch(() => reject())
        })
      }))
        .then((results) => {
          let data = {};
          for (let i = 0; i < results.length; i++) {
            let item = results[i];
            data[item.id] = {
              effects: item.effects.map((effect) => effect.effect_id),
              tracks: item.tracks.map((track) => track.track_id)
            }
          }
          setDungeonData(data);
        })
    }
  }, [dungeons]);

  const refreshDungeons = () => {
    if (loggedIn) {
      REQUEST.getDungeons()
        .then((data) => {
          setDungeons(data);
        });
    }
  };

  const submit = () => {
    setLoading(true);
    REQUEST.getSounds(term)
      .then((data) => {
        setTrackResults(data.tracks);
        setFxResults(data.fx);
        setLoading(false);
      })
      .catch(() => {
        setTrackResults([]);
        setFxResults([]);
        setLoading(false);
      })
  };

  const playSound = (sound, i, type) => {
    playingTrack && dispatch(playPause(false));
    if (playingSample === type + '-' + i) {
      setPlayingSample(null);
      Audio.stopSample();
    } else {
      setPlayingSample(type + '-' + i);
      Audio.playSample(sound.source, () => {
        setPlayingSample(null);
      });
    }
  };

  return <PageContainer>
    <SearchContainer>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={submit}><FaSearch /></button>
    </SearchContainer>

    <ResultsContainer>
      <ResultList
        type="tracks"
        results={trackResults}
        playingSample={playingSample}
        playSound={playSound}
        refresh={refreshDungeons}
        loading={loading}
        dungeons={dungeons}
        dungeonData={dungeonData}
      />
      <ResultList
        type="effects"
        results={fxResults}
        playingSample={playingSample}
        playSound={playSound}
        refresh={refreshDungeons}
        loading={loading}
        dungeons={dungeons}
        dungeonData={dungeonData}
      />
    </ResultsContainer>
  </PageContainer>;
};

export default Search;