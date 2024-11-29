import React, { createContext, useState } from 'react'

export const BASKETDATA=createContext(null)
function BasketContext({children}) {
  return (
    // const [hello,sethello]=useState(null)
    <>
      <BASKETDATA.Provider>
        {children}
      </BASKETDATA.Provider>
    </>
  )
}

export default BasketContext
