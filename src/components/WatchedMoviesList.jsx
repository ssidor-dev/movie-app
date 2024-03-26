import PropTypes from "prop-types";
import styles from "./WatchedMoviesList.module.css";

import WatchedMovie from "./WatchedMovie"
export default function WatchedMoviesList({watched, onDeleteWatched}) {
    return (
        //mapping over the watched prop and rendering a <WatchedMovie /> component for each index in the array
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