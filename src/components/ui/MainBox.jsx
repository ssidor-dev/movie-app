import PropTypes from "prop-types";
import styles from "./MainBox.module.css";

export default function MainBox({ children }) {
  return <main className={styles.main}>{children}</main>;
}

MainBox.propTypes = {
  children: PropTypes.node,
};
