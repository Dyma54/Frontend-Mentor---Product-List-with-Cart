import "./App.css";
import ProductList from "./components/ui/product-list/product-list";
import Cart from "./components/cards/cart/cart";
import CartContextProvider from "./context/cart.context";
import ConfirmedOrderModalContextProvider from "./context/confirmed-modal.context";



function App() {

  return (
    <>
      <CartContextProvider>
        <ConfirmedOrderModalContextProvider>
          <ProductList />
          <Cart />
        </ConfirmedOrderModalContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
