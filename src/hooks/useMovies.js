import { useEffect, useState } from "react";

/*
 The useMovies takes in the values string "query", string "searchParam", and a function "callback" and
 abstracts away fetching data from the omdbapi and returns an object 
 with the values "movies" "isLoading" and "error".

 The "searchParam" argument is used by this api to determine what the api will return either a search for an array of movies or a indexed selected movie.
 Both "searchParam" and the function "callback" are optional if reusing this for a different api call.

*/

// API KEY
const KEY = "3962d4bb";

/*
 try adding a third argument to useMovies custom hook: searchParam
  in here it's "s" but in MovieDetail component it is "i"
  this custom hook will be more versitile if it can be used to both fetch new movie data and detailed movie data
*/

export function useMovies(query, searchParam, callback) {
  const [movies, setMovies] = useState([]); //movies is the array of data that will be fetched
  const [isLoading, setIsLoading] = useState(false); //isLoading is a boolean value to determine if page is loading
  const [error, setError] = useState(""); //error is a string value used to display an error message

  // using useEffect to handle async fetch side effect
  useEffect(
    function () {
      // optional chaining is used to check if callback exists and if it exists then calls the function that is passed in
      callback?.();

      // create a new AbortController object instance to handle communicating when the async operation is done
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          // set state of isLoading to true and set state of error to an empty string
          setIsLoading(true);
          setError("");

          // getting the response from the api using the built in fetch functionality
          // takes in the query parameter that was passed in and the API KEY
          // and sets the controller signal as the second argument to fetch function call
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&${searchParam}=${query}`,
            { signal: controller.signal }
          );

          // confirms if response is anything other than ok and throws new Error with custom message
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          // sets the chains the json method onto the response and binds it to the variable data
          // checks if data.Response is false and throws new Error with custom message in this instance
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }

          // sets the movie array to the Search query that was fetched and sets error to an empty string since fetch action is over
          //setMovies(data.Search);
          setMovies(data);
          setError("");
        } catch (error) {
          //incase of error and error is not an "AbortError" catch block runs and sets the error to the error.message
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          // isLoading is set back to false in the finally block as loading is false regardless of whether try or catch block is run
          setIsLoading(false);
        }
      }

      // setting a guard clause to check is the negation of query.length
      // and sets the movies array to an empty array, the error message to an empty string, and returns early if this negation is true
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }

      // otherwise the fetchMovies function is called
      fetchMovies();

      // the cleanup function for this useEffect hook aborts the async action
      return function () {
        controller.abort();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  // returning the array value movies, the boolean value of isLoading, and the string value of error
  return { movies, isLoading, error };
}
