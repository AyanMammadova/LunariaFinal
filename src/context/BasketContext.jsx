import React, { createContext, useEffect, useState } from 'react'
export const BASKET = createContext(null)
function BasketContext({ children }) {
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')

    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basketLocal')) || [])

    const SubTotal = basket.reduce((total, item) => total + ((item.discount>1 ?  ((item?.price * (100 - item?.discount)) / 100).toFixed(1) : item.price) * item.quantity), 0)

    function handleCount(id,color,size, count) {
        setBasket(basket?.map(item =>
                item.id == id && item.size==size && item.color==color && (item.quantity >1 || count>0)
                ? { ...item, quantity: item.quantity + count }
                : item
        )
    )}

    function handleSize(size) {
        setSize(size)
    }
    function handleColor(color) {
        setColor(color)
    }

    function addToBasket(id, name, description, price, discount, brand, images, size, color, quantity) {
        if (basket?.find(item => item.id == id && item.color == color && item.size == size)) {
            setBasket(basket?.map(item =>
                item.id == id && item.color == color && item.size == size
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
                size: size,
                color: color,
                quantity: 1
            }
            ])
        }

        setSize('')
        setColor('')
    }

    function removeFromBasket(id, size, color) {
        setBasket(
            basket.filter(item => !(item.id == id && item.color == color && item.size == size))
        )
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
                    removeFromBasket,
                    handleSize,
                    SubTotal,
                    size,
                    setSize,
                    color,
                    setColor,
                    handleColor,
                    handleCount
                }}

            >
                {children}
            </BASKET.Provider>
        </div>
    )
}

export default BasketContext
