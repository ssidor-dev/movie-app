import PropTypes from "prop-types";
import styles from "./WatchedMoviesList.module.css";

import WatchedMovie from "./WatchedMovie"
export default function WatchedMoviesList({watched, onDeleteWatched}) {
    return (
        <ul className={styles.list}>
            {watched.map((movie) => (
             <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
            ))}
          </ul>
    )
}

WatchedMoviesList.propTypes = {
    watched: PropTypes.array,
    onDeleteWatched: PropTypes.func
}