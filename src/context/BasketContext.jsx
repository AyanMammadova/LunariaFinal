import React, { createContext, useEffect, useState } from 'react'
export const BASKET = createContext(null)
function BasketContext({ children }) {
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basketLocal')) || [])



    function addToBasket(id, name, description, price, discount, brand, images,size,quantity) {
        if (basket?.find(item => item.id == id)) {
            setBasket(basket?.map(item =>
                item.id == id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
        }
        else {
            setBasket([...basket,
            {
                id: id,
                name: name,
                description: description,
                price: price,
                discount: discount,
                brand: brand,
                images: images,
                size:size,
                quantity:1

            }
            ])
        }
    }
    
    function removeFromBasket(id){
        setBasket(basket.filter(item=>item.id!=id))
    }

    useEffect(() => {
        localStorage.setItem('basketLocal', JSON.stringify(basket));
    }, [basket])
    return (
        <div>
            <BASKET.Provider
                value={{
                    addToBasket,
                    basket,
                    removeFromBasket
                }}

            >
                {children}
            </BASKET.Provider>
        </div>
    )
}

export default BasketContext
