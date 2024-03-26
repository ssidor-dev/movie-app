import PropTypes from "prop-types";
import Movie from "./Movie";
import styles from "./MovieList.module.css";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    // using optional chaining to map over the movies array not an empty array
    // renders a <Movie /> component for each index in the movies array
    <ul className={`${styles.list} ${styles["list-movies"]}`}>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  onSelectMovie: PropTypes.func,
};
