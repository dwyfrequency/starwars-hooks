import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './CharPicker.css';

const CharPicker = props => {
  // state = { characters: [], isLoading: false };
  const [loadedChars, setLoadedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // use effect is specifically built to manage side effects
    // will be run after every render cycle if no array of dependencies are passed
    // with empty array [] - it's like componentDidMount
    console.log('>>>it works');
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://swapi.co/api/people`);
        const selectedCharacters = response.data.results.slice(0, 5);
        const charDetailObj = selectedCharacters.map(({ name }, index) => {
          return {
            name,
            id: index + 1,
          };
        });
        setLoadedChars(charDetailObj);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  let content = <p>Loading characters...</p>;

  if (!isLoading && loadedChars && loadedChars.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {loadedChars.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!loadedChars || loadedChars.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
