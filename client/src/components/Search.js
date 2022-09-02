import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaPlay, FaStop } from 'react-icons/fa';
import { AiOutlineLoading3Quarters as AiLoading } from 'react-icons/fa';
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

  :hover {
    color: ${({ playing }) =>
    playing
      ? 'var(--theme-list-text-selected)'
      : 'var(--theme-text)'
  };

    .play-icon {
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

const ResultList = ({ playingSample, playSound, results, type, loading }) => {
  if (loading) {
    return <ResultListContainer>
      <ListHeader>{type}</ListHeader>
      <ResultItem><Loader size='20px'/></ResultItem>
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
  const playingTrack = useSelector((state) => state.audio.playing);
  const dispatch = useDispatch();

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
      Audio.playSample(sound.source);
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
        loading={loading}
      />
      <ResultList
        type="effects"
        results={fxResults}
        playingSample={playingSample}
        playSound={playSound}
        loading={loading}
      />
    </ResultsContainer>
  </PageContainer>;
};

export default Search;