import ProductItem from "../product-item/product-item"
import { getImageUrl } from "../../../utils/image-util"
import { useEffect, useState } from "react"
import styles from './product-list.module.scss'
import ConfirmOrderModal from "../../modals/confirm-order-modal/confirm-order-modal"
import { useConfirmedOrderContext } from "../../../hooks/use-confirmed-order-context"


export default function ProductList() {
    const [products, setProducts] = useState([])
    const {isOpen} = useConfirmedOrderContext()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('data.json')
    
                if (!response.ok){
                    throw new Error('Data was not recovered')
                }
    
                const data = await response.json()

                setProducts(data)
    
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchProducts()
    }, [])
    
    return (
        <div className={styles.productListContainer}>
            <header>
                <h1>Desserts</h1>
            </header>
            <main className={styles.productList}>
                {products.map(product => (
                    <ProductItem 
                        key={product.name} 
                        desktopImg={getImageUrl(product.image.desktop)} 
                        tabletImg={getImageUrl(product.image.tablet)} 
                        mobileImg={getImageUrl(product.image.mobile)} 
                        thumbnailImg={getImageUrl(product.image.thumbnail)}
                        name={product.name} 
                        category={product.category}
                        price={product.price} 
                    />
                ))}
            </main>
            <footer>
                {isOpen && <ConfirmOrderModal/>}
            </footer>
        </div>
    )
}
