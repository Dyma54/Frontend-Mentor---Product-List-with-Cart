import PropTypes from "prop-types"
import basket from '/assets/images/icon-add-to-cart.svg'
import minus from '/assets/images/icon-decrement-quantity.svg'
import plus from '/assets/images/icon-increment-quantity.svg'
import styles from './product-item.module.scss'
import useIncrementOrDecrementQuantity from "../../../hooks/use-increment-or-decrement-quantity"
import { useCartContext } from "../../../hooks/use-cart-context"
import { useEffect, useState} from "react"
import Button from "../../buttons/button/button"

export default function ProductItem({desktopImg, tabletImg, mobileImg, thumbnailImg, name, category, price}) {
  const [quantity, resetQuantity, incrementQuantity, decrementQuantity] = useIncrementOrDecrementQuantity(0)
  const { cart, addToCart, resetedProduct, emptyResetProductName, removeToCart} = useCartContext()
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (resetedProduct === name){
      resetQuantity()
      setIsClicked(false)
    }

    return emptyResetProductName()
  }, [resetedProduct, name, resetQuantity, emptyResetProductName])

  useEffect(() => {
    if (cart.length === 0){
      resetQuantity()
      setIsClicked(false)
    }
  }, [resetQuantity, setIsClicked, cart])

  const handleIncrement = () => {
    incrementQuantity()
    setIsClicked(true)
    addToCart({name, price, quantity: quantity + 1, thumbnailImg})
  }

  const handleDecrement = () => {
    if (quantity === 1){
      resetQuantity()
      removeToCart(name)
      setIsClicked(false)
    } else {
      decrementQuantity()
      addToCart({ name, price, quantity: quantity - 1 })
    }
  }

  return (
    <div className={styles.productItem}>
      <div className={styles.productContainer}>
        <picture>
          <source media="(min-width: 60em)" srcSet={desktopImg} />
          <source media="(min-width: 40em)" srcSet={tabletImg} />
          <img
            src={mobileImg}
            alt={name}
            className={isClicked ? styles.imageBorder : ""}
          />
        </picture>
        {quantity ?  ( 
          <Button className={styles.quantityProductButton}>
            <img
              src={minus}
              alt="Decrement quantity"
              onClick={handleDecrement}
              className={styles.minus}
            />
            <span>{quantity}</span>
            <img
              src={plus}
              alt="Increment quantity"
              onClick={handleIncrement}
              className={styles.plus}
            />
          </Button>
        ) : (
          <Button className={styles.basketContainer} onClick={handleIncrement}>
            <img src={basket} alt="basket svg" />
            <span>Add to cart</span>
          </Button>
        )}
      </div>
      <div className={styles.infosProduct}>
        <p className={styles.productCategory}>{category}</p>
        <p className={styles.productName}>{name}</p>
        <p className={styles.productPrice}>{price}$</p>
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  desktopImg: PropTypes.string.isRequired,
  tabletImg: PropTypes.string.isRequired,
  mobileImg: PropTypes.string.isRequired,
  thumbnailImg: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}


