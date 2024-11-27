import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDataBySubCategory } from '../../services/api'
import { DATA } from '../../context/DataContext'
import ProductSwiper from './ProductSwiper'

function BySubCategory() {
    const {subname,subid}=useParams()
    const {dataCategory}=useContext(DATA)

    
    

  return (
    <>
      <div className='text-center pt-[150px]'>
        <p className='text-[3em] font-serif'>{subname}</p>
        <ul className='underline flex gap-[20px] justify-center'>
          {
            dataCategory && dataCategory[subid-2]?.Subcategory.map((item,i)=>{
              return <Link key={i}>{item.name}</Link>
            })
          }

        </ul>
          <ProductSwiper type={'subcategory'} validId={subid}/>
      </div>
    </>
  )
}

export default BySubCategory
