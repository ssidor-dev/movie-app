import PropTypes from "prop-types";
import styles from "./NumResults.module.css";

export default function NumResults({ movies }) {
  return (
    <p className={styles["num-results"]}>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

NumResults.propTypes = {
  movies: PropTypes.array,
};
