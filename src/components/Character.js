import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/useHttp';
import axios from 'axios';
import Summary from './Summary';

const Character = props => {
  const [isLoading, fetchedData] = useHttp(
    `https://swapi.co/api/people/${props.selectedChar}`,
    [props.selectedChar]
  );
  console.log(isLoading, fetchedData);

  const loadedCharacter = fetchedData
    ? {
        id: props.selectedChar,
        name: fetchedData.name,
        height: fetchedData.height,
        colors: {
          hair: fetchedData.hair_color,
          skin: fetchedData.skin_color,
        },
        gender: fetchedData.gender,
        movieCount: fetchedData.films.length,
      }
    : {};

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

  useEffect(() => {
    return () => {
      console.log('Character component did unmount');
    };
  });

  console.log('rendering character component');

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
