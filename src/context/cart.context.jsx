import { createContext, useState } from "react"
import PropTypes from "prop-types"

export const CartContext = createContext({
    cart: [], 
    setCart: () => {}
})

export default function CartContextProvider({children}){
    const [cart, setCart] = useState([])
    const [resetedProduct, setResetedProduct] = useState('')

    const addToCart = (productInfos) => {
        setCart(prevCart => {
            const productExists = prevCart.some(product => product.name === productInfos.name)
    
            if (productExists) {
                return prevCart.map(product => 
                    product.name === productInfos.name ? { ...product, ...productInfos } : product
                )
            } else {
                return [...prevCart, productInfos]
            }
        })
    }


    const resetProduct = (productName) => {
        setResetedProduct(productName)
    }

    const emptyResetProductName = () => setResetedProduct('')

    const removeToCart = (productName) => {
        setCart(prevCart => prevCart.filter(product => product.name !== productName))
    }

    const clearCart = () => {
        setCart([])
    }


    return (
      <CartContext.Provider
        value={{
          cart, 
          resetedProduct,
          addToCart,
          removeToCart,
          resetProduct,
          emptyResetProductName,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    );
}

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}