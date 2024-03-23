import PropTypes from "prop-types";
import { useRef } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";
import styles from "./Search.module.css";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKeyPress("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

Search.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};
