import PropTypes from "prop-types";
import styles from "./NavBar.module.css";

export default function NavBar({ children }) {
  return <nav className={styles["nav-bar"]}>{children}</nav>;
}

NavBar.propTypes = {
  children: PropTypes.node,
};
