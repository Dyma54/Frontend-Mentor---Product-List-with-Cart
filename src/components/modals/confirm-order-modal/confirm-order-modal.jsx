import { useCartContext } from "../../../hooks/use-cart-context";
import styles from "./confirm-order-modal.module.scss";
import orderConfirmedIcon from "/assets/images/icon-order-confirmed.svg";
import { createPortal } from "react-dom";
import { useConfirmedOrderContext } from "../../../hooks/use-confirmed-order-context";
import { useEffect } from "react";
import GenericButton from "../../buttons/generic-button/generic-button";

export default function ConfirmOrderModal() {
  const { cart, clearCart } = useCartContext()
  const {isOpen, onClose} = useConfirmedOrderContext()

  useEffect(() => {
    if (isOpen){
      document.body.classList.add('disableScroll')
    }

    return () => document.body.classList.remove('disableScroll')
  }, [isOpen])

  return createPortal(
    <div className={styles.confirmOrderContainer} onClick={onClose}>
      <section className={styles.confirmOrderModal} onClick={(event) => event.stopPropagation()}>
        <header className={styles.confirmOrderHeader}>
          <img src={orderConfirmedIcon} alt="Order confirmed icon" />
          <h1>Order confirmed</h1>
          <p>We hope you enjoy your food!</p>
        </header>
        <main className={styles.productInfos}>
          <ul>
            {cart.map((product) => (
              <li key={product.name}>
                <div className={styles.productInfosLeft}>
                  <img
                    src={product.thumbnailImg}
                    alt="product thumbnail image"
                    width={40}
                    height={40}
                  />
                  <p>
                    <span>{product.name}</span>
                    <span>
                      <span>{product.quantity}x</span>&nbsp;&nbsp;&nbsp;@$
                      {product.price}
                    </span>
                  </p>
                </div>
                <span className={styles.productTotalPrice}>
                  ${product.price * product.quantity}
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.orderTotal}>
            <span>Order total</span>
            <span>
              $
              {cart.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              )}
            </span>
          </p>
        </main>
        <footer>
          <GenericButton
            text="Start New Order"
            onClick={clearCart}
          />
        </footer>
      </section>
    </div>,
    document.body
  );
}
