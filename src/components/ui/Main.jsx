import PropTypes from "prop-types";
import styles from "./Main.module.css";

export default function Main({ children }) {
  return <main className={styles.main}>{children}</main>;
}

Main.propTypes = {
  children: PropTypes.node,
};
