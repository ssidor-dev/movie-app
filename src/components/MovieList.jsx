import PropTypes from "prop-types";
import Movie from "./Movie";
import styles from "./MovieList.module.css";

export default function MovieList({ movies, onSelectMovie}) {
  return (
    <ul className={`${styles.list} ${styles["list-movies"]}`}>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  onSelectMovie: PropTypes.func,
  
};
