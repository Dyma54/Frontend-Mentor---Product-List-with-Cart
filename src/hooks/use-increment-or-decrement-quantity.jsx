import { useState } from "react"

export default function useIncrementOrDecrementQuantity(defaultQuantity) {
    const [quantity, setQuantity] = useState(defaultQuantity)

    const resetQuantity = () => setQuantity(0)
    const incrementQuantity = () => setQuantity(prevQuantity => prevQuantity + 1)
    const decrementQuantity = () => {
        if (quantity > 0) setQuantity(prevQuantity => prevQuantity - 1)
    }

    return [ quantity, resetQuantity, incrementQuantity, decrementQuantity ]
}
