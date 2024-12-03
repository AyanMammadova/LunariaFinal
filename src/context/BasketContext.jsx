import React, { createContext, useState } from 'react'
export const BAKSET = createContext([])
function BasketContext({ children }) {
  const [basket, setBasket] = useState([])


  function addToBasket(id, name, description, price, discount, brand) {
    if (basket.find(item => item.id == id)) {
      setBasket(basket.map(item => {
        item?.id == id ?
          { ...item, quantity: item.quantity + 1 }
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
      <BAKSET.Provider
        value={{
          basket,
          setBasket,
          addToBasket

        }}
      >
        {children}
      </BAKSET.Provider>
    </div>
  )
}

export default BasketContext
