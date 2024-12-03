import React, { createContext, useState } from 'react'
export const  BASKET  = createContext(null)
function BasketContext({ children }) {
    const [basket, setBasket] = useState(null)
    


    function addToBasket(id, name, description, price, discount, brand) {
        console.log('ksdbkjsdns')
        if (basket.find(item => item.id == id)) {
            setBasket(basket.map(item => {
                item?.id == id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            })
            )
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
                quantity: 1
            }
            ])
        }
        console.log(basket)

    }
    return (
        <div>
            <BASKET.Provider
                value={{
                    addToBasket,
                    basket
                }}

            >
                {children}
            </BASKET.Provider>
        </div>
    )
}

export default BasketContext
