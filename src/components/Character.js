import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Summary from './Summary';

const Character = props => {
  console.log(props);
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        `Sending Http request for new character with id ${props.selectedChar}`
      );
      try {
        setIsLoading(true);
        const charData = await axios.get(
          `https://swapi.co/api/people/${props.selectedChar}`
        );
        setLoadedCharacter({
          id: props.selectedChar,
          name: charData.data.name,
          height: charData.data.height,
          colors: {
            hair: charData.data.hair_color,
            skin: charData.data.skin_color,
          },
          gender: charData.data.gender,
          movieCount: charData.data.films.length,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      console.log('cleaning up component');
    };
  }, [props.selectedChar]);

  useEffect(() => {
    return () => {
      console.log('Character component did unmount');
    };
  });
  /*
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return (
      nextProps.selectedChar !== props.selectedChar ||
      nextState.loadedCharacter.id !== loadedCharacter.id ||
      nextState.isLoading !== isLoading
    );
  }

  componentDidUpdate(prevProps) {
    console.log('Component did update');
    if (prevProps.selectedChar !== props.selectedChar) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setIsLoading(true);
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color,
          },
          gender: charData.gender,
          movieCount: charData.films.length,
        };
        setLoadedCharacter(loadedCharacter);
        setIsLoading(false);

      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    console.log('Too soon...');
  }
  */
  console.log('rendering character component');
  let content = <p>Loading Character...</p>;
  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

// we are doing this so that when the state changes from light to dark and we get a rerender from our parent, this component does not rerender
// To create a version of shouldcomponentupdate - we can memoize our component
// this will store the component and only rerender it when the props change
// if we need more control, we can pass a second arg - callback
// note, this returns true for no rerender and false for a rerender
export default React.memo(Character, (prevProps, nextProps) => {
  return prevProps.selectedChar === nextProps.selectedChar;
});
