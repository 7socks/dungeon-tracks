import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import Audio from '../app/audio';

import REQUEST from '../router/router';

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  input[type="text"] {
    border: none;
    background: (--theme-search-bar-bg);
    color: (--theme-search-bar-text);
    height: 2em;
    width: 30em;
    font-size: 18px;
    padding: 0 1em;
    border-radius: 1em 0 0 1em;
  }
`;

const ResultsContainer = styled.div`
`;

const Search = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  const submit = () => {
    REQUEST.getSounds(term)
      .then((data) => {
        setResults(data);
      });
  };

  const playSound = (sound) => {

  };

  return <PageContainer>
    <SearchContainer>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={submit}><FaSearch/></button>
    </SearchContainer>
    <ResultsContainer>
      <ul>
        {results.map((item, i) => {
          return <li key={i}>
            <button onClick={() => {}}></button>
            <span>{item.title}</span>
          </li>
        })}
      </ul>
    </ResultsContainer>
  </PageContainer>;
};

export default Search;