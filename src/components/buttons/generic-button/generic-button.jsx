import styles from "./generic-button.module.scss";
import PropTypes from "prop-types";

export default function GenericButton({text, onClick}) {
  return (
    <button
      className={styles.genericButton}
      type="button"
      aria-label={text}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

GenericButton.propTypes = {
    text: PropTypes.string.isRequired, 
    onClick: PropTypes.func.isRequired
}


