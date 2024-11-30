import React, { createContext } from 'react'
export const BAKSET=createContext(null)
function BasketContext({children}) {


  function addToBasket(id){
    console.log(id)
  }

  return (
    <BAKSET.Provider
      value={{
        addToBasket

      }}
    >
      {children}
    </BAKSET.Provider>
  )
}

export default BasketContext
