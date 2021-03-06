import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/useHttp';

import './CharPicker.css';
console.log(useHttp);

const CharPicker = props => {
  // state = { characters: [], isLoading: false };
  const [isLoading, fetchedData] = useHttp(`https://swapi.co/api/people`, []);

  // use effect is specifically built to manage side effects
  // will be run after every render cycle if no array of dependencies are passed
  // with empty array [] - it's like componentDidMount

  let loadedCharacter = null;
  if (fetchedData) {
    loadedCharacter = fetchedData.results.slice(0, 5).map(({ name }, index) => {
      return {
        name,
        id: index + 1,
      };
    });
  }

  let content = <p>Loading characters...</p>;

  if (!isLoading && loadedCharacter && loadedCharacter.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {loadedCharacter.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!loadedCharacter || loadedCharacter.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
