import { useEffect, useState, useRef } from "react";
import { useKeyPress } from "../hooks/useKeyPress";
import { useMovies } from "../hooks/useMovies";
import StarRating from "./star-rating/StarRating";
import Loader from "./ui/Loader";
import ErrorMessage from "./ui/ErrorMesage";
import PropTypes from "prop-types";
import styles from "./MovieDetail.module.css";

// the MovieDetail component takes in 4 arguments, as specified in the propTypes at the end of the file.
export default function MovieDetail({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  // useState for capturing the userRating value
  const [userRating, setUserRating] = useState("");

  // using the useMovie custom hook with the selectedId passed in for the "query" parameter and "i" passed in for the "searchParams" parameter
  const { movies, isLoading, error } = useMovies(selectedId, "i");

  // using the useKeyPress custom hook to close out selected movie when escape key is pressed
  useKeyPress("Escape", onCloseMovie);

  // initializing countRef to capture behind the scenes data on how many ratings the user selected before adding a movie to the watched list
  const countRef = useRef(0);

  // using useEffect to increase countRef count
  useEffect(
    function () {
      if (userRating) {
        countRef.current = countRef.current + 1;
      }
    },
    [userRating]
  );

  // isWatched maps over the movie array and determines if the movie.imdbID includes the selectedId
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  // watchedUserRating finds the the movie with the imdbID and compares it with the selectedId and if this is a match
  // optional chaining is used to set the watchedUserRating variable to the found userRating
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  // using object destructuring to set the object keys fetched from the api to values with lower case beginning chars
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movies;

  // the handleAdd function adds a newWatchedMovie object as an argument to the onAddWatched function and closes the selected movie out by calling onCloseMovie()
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatings: countRef.current, // adds behind the scenes countRatings from initialized countRef to the newWatchedMovie object
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  // using useEffect to set the document.title to the current selected movie title otherwise use "usePopcorn" as the default title
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    // MovieDetails component confirms if isLoading is true and displays <Loader /> component using a ternary operator
    // if isLoading is false then movie detail content is rendered
    <div className={styles.details}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className={styles["btn-back"]} onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} movie poster`} />
            <div className={styles["details-overview"]}>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className={styles.rating}>
              {
                // nested ternary operation testing if isWatched is false and if so renders the <StarRating /> components to take user rating
                // if isWatched is true then it renders what the user rated the movie
                !isWatched ? (
                  <>
                    {" "}
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button className={styles["btn-add"]} onClick={handleAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You rated this movie {watchedUserRating} <span>⭐</span>
                  </p>
                )
              }
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

MovieDetail.propTypes = {
  selectedId: PropTypes.string,
  onCloseMovie: PropTypes.func,
  onAddWatched: PropTypes.func,
  watched: PropTypes.array,
};
