import { useState, useEffect } from 'react';
// dont need to import React as well b/c we will not be rendering jsx
import axios from 'axios';

// custom hook
function useHttp(url, dependencies = []) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  // hooks cannot be nested inside other hooks, they must always be on the top level our of function. so we cannot pass our hook to use effect to be run in the callback
  // but we can use useEffect in our custom hook

  useEffect(() => {
    console.log('http useEffect running');
    setIsLoading(true);
    axios
      .get(url)
      .then(response => {
        setFetchedData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });

    // we can return anything from our custom hook, but here we'll return our loading status and the data from our api
  }, [url, ...dependencies]);
  return [isLoading, fetchedData];
}

export default useHttp;
