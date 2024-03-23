import PropTypes from "prop-types";
import styles from "./WatchedMovie.module.css";

export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className={styles["btn-delete"]} onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}

WatchedMovie.propTypes = {
  movie: PropTypes.object,
  onDeleteWatched: PropTypes.func
}
