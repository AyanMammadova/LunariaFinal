import React, { createContext, useState } from 'react'
import { Cookies } from 'react-cookie'
export const BAKSET=createContext([])
function BasketContext({children}) {
  const [basket,setBasket]=useState([])
  // const cookie=new Cookies


  function addToBasket(id,name,description,price,discount,brand){
   console.log(id)
      if(basket.find(item=>item.id==id)){
        setBasket( basket.map(item=>{
          [
            ...item,
            item.price+1
          ]
        })
        )
      }
      else{
        setBasket([...basket,
          {
            id:id,
            name:name,
            description:description,
            price:price,
            discount:discount,
            brand:brand
          }
        ])
      }
      console.log(basket)
  
  }

  return (
    <div>
      <BAKSET.Provider
        value={{
          addToBasket,
          basket,
          setBasket

        }}
      >
        {children}
      </BAKSET.Provider>
    </div>
  )
}

export default BasketContext
