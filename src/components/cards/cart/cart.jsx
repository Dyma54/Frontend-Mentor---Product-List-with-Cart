import styles from "./cart.module.scss"
import { useCartContext } from "../../../hooks/use-cart-context"
import { useConfirmedOrderContext } from "../../../hooks/use-confirmed-order-context"
import emptyCart from "/assets/images/illustration-empty-cart.svg"
import carbonIcon from '/assets/images/icon-carbon-neutral.svg'
import GenericButton from "../../buttons/generic-button/generic-button"
import RemoveButton from "../../buttons/remove-button/remove-button"

export default function Cart() {
  const { cart, resetProduct, removeToCart } = useCartContext()
  const { onOpen } = useConfirmedOrderContext()

  const handleRemoveToCart = (name) => {
    removeToCart(name)
    resetProduct(name)
  }

  return (
    <section className={styles.cart}>
      <h1 className={styles.cartTitle}>
        Your cart(
        {cart.reduce((acc, product) => acc + product.quantity, 0)})
      </h1>
      {cart.length ? (
        <div>
          <ul className={styles.cartList}>
            {cart.map((product) => (
              <li key={product.name}>
                <p className={styles.productName}>{product.name}</p>
                <p className={styles.productDetails}>
                  <span>
                    <span className={styles.productQuantity}>
                      {product.quantity}x
                    </span>
                    <span className={styles.productPrice}>
                      @${product.price} ${product.price * product.quantity}
                    </span>
                  </span>
                  <RemoveButton
                    productName={product.name}
                    onClick={() => handleRemoveToCart(product.name)}
                  />
                </p>
              </li>
            ))}
          </ul>
          <div className={styles.confirmOrderContainer}>
            <p className={styles.orderTotalContainer}>
              <span>Order total</span>
              <span className={styles.total}>
                ${cart.reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0
                )}
              </span>
            </p>
            <p className={styles.carbonContainer}>
              <img src={carbonIcon} alt="Carbon neutral icon" />
              This is a&nbsp;<span>carbon-neutral</span>&nbsp;delivery
            </p>
            <GenericButton
              text="Confirm order"
              onClick={onOpen}
            />
          </div>
        </div>
      ) : (
        <div className={styles.emptyCartContainer}>
          <p>
            <img src={emptyCart} alt="Empty cart" />
          </p>
          <p>Your added items will appear here</p>
        </div>
      )}
    </section>
  );
}
