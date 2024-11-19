import React, { createContext, useEffect, useState } from 'react'
import { getDataCategories } from '../services/api'
export const DATA=createContext(null)
function DataContext({children}) {
    const [dataCategory,setDataCategory]=useState(null)
    useEffect(()=>{
      getDataCategories().then(res=>{setDataCategory(res)})
    },[])
    const imgsformenu=[
      'https://www.emporium.az/b/cat/28-81-women-accessories.jpg?v=140324',
      'https://www.emporium.az/b/cat/29-313-men-clothing.jpg?v=140324',
      'https://www.emporium.az/b/cat/23-547-girls.jpg?v=140324',
      'https://www.emporium.az/b/cat/16-611-necklaces.jpg?v=140324',
      'https://www.emporium.az/b/cat/8-269-skin-care.jpg?v=140324',
      'https://www.emporium.az/b/cat/1-586-bathroom.jpg?v=140324',
    ]
    const imgsfordeps=[
      'https://www.emporium.az/i/maincard/cat_65.jpg?v=1.8.23',
      'https://www.emporium.az/i/maincard/cat_1.jpg?v=1.8.23',
      'https://www.emporium.az/i/maincard/cat_189.jpg?v=1.8.23',
      'https://www.emporium.az/i/maincard/cat_264.jpg?v=1.8.23',
      'https://www.emporium.az/i/maincard/cat_297.jpg?v=1.8.23',
      'https://www.emporium.az/i/maincard/cat_228.jpg?v=1.8.23',
    ]
    return (
      <>
        <DATA.Provider
          value={{
              dataCategory,
              setDataCategory,
              imgsformenu,
              imgsfordeps
          }}
        >
          {children}
        </DATA.Provider>
      </>
    )
}

export default DataContext
