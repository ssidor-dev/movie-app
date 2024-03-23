import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Box.module.css";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.box}>
      <button className={styles["btn-toggle"]} onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && <>{children}</>}
    </div>
  );
}



Box.propTypes = {
  children: PropTypes.node,
};
