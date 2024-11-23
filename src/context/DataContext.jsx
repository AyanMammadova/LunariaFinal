import React, { createContext, useEffect, useState } from 'react'
import { getDataAll, getDataByCategory, getDataCategories } from '../services/api'
export const DATA=createContext(null)
function DataContext({children}) {
    const [dataCategory,setDataCategory]=useState(null)
    const [dataByCategory,setDataByCategory]=useState(null)
    const [dataAll,setDataAll]=useState(null)
    
    useEffect(()=>{
        getDataCategories().then(res=>{setDataCategory(res)})
        getDataAll().then(res=>{setDataAll(res.data)})
      },[]
    )
    const dataDiscounted= dataAll?.filter(item=>item.discount>1)
                          .sort((a,b)=>b.discount-a.discount)
    

    const imgsforfooter=[
      'https://www.emporium.az/i/social/instagram-1.jpg?v=120724',
      'https://www.emporium.az/i/social/instagram-2.jpg?v=120724',
      'https://www.emporium.az/i/social/instagram-3.jpg?v=120724',
      'https://www.emporium.az/i/social/instagram-4.jpg?v=120724',
      'https://www.emporium.az/i/social/instagram-5.jpg?v=120724  ',
      'https://www.emporium.az/i/social/instagram-6.jpg?v=120724',
      'https://tradium.ibradev.me/img/instagram-1.jpg',
      'https://tradium.ibradev.me/img/instagram-3.jpg',
      'https://tradium.ibradev.me/img/instagram-5.jpg',
      'https://tradium.ibradev.me/img/instagram-4.jpg',
      'https://tradium.ibradev.me/img/instagram-6.jpg',
    ]
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
      'https://www.emporium.az/b/cat/32-26-men-watches.jpg?v=140324',
      'https://www.emporium.az/i/maincard/cat_189.jpg?v=1.8.23',
      'https://www.emporium.az/i/maincard/cat_297.jpg?v=1.8.23',
      'https://www.emporium.az/b/beauty-page-main-banner-desktop.jpg?v=140324',
      'https://www.emporium.az/b/cat/2-235-bedroom.jpg?v=140324',
    ]

    return (
      <>
        <DATA.Provider
          value={{
              dataCategory,
              setDataCategory,
              dataByCategory,
              imgsformenu,
              imgsfordeps,
              imgsforfooter,
              dataDiscounted
          }}
        >
          {children}
        </DATA.Provider>
      </>
    )
}

export default DataContext
