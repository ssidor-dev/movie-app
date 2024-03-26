import PropTypes from "prop-types";
import { useRef } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";
import styles from "./Search.module.css";

// the Search component takes in arguments "query" and "setQuery" from the parent component <App /> in which the state was lifted up to
// query is used to make this a controlled input component and setQuery is used to capture the search query entered by the user in the input onChange event function
export default function Search({ query, setQuery }) {
  // initializing useRef in the inputEl variable
  const inputEl = useRef(null);

  // using the custom hook useKeyPress to focus on inputEl when "enter" key is pressed
  // this also clears the current query and clears the list of rendered movie serch results
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
