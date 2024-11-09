import styles from './remove-button.module.scss'
import removeIcon from "/assets/images/icon-remove-item.svg"
import PropTypes from 'prop-types'

export default function RemoveButton({productName, onClick}) {
  return (
    <button
      className={styles.removeProductBtn}
      type="button"
      onClick={onClick}
      aria-label={`Remove ${productName} from cart`}
    >
      <img src={removeIcon} alt="Remove item" />
    </button>
  )
}

RemoveButton.propTypes = {
  productName: PropTypes.string.isRequired, 
  onClick: PropTypes.func.isRequired
}


