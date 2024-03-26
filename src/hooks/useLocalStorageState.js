import { useState, useEffect } from "react";

/*
 useLocalStorage takes in an initialState and a key and abstracts the 
 localStorage process to a custom hook allowing this to be used in 
 different components and returns an array with two values: "value" and function "setValue"
*/

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
