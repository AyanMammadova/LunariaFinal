import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getDataBySubCategory } from '../../services/api'
import { DATA } from '../../context/DataContext'
import ProductSwiper from './ProductSwiper'

function BySubCategory() {
    const {catname,catid,subname,subid}=useParams()
    const {dataCategory,dataFilter}=useContext(DATA)
    
  return (
    <>
      <div className=' pt-[150px]'>
        <p className='text-[3em] font-serif text-center'>{subname}</p>
        <ul className='underline flex  gap-[20px] justify-center'>
          {
            dataCategory && dataCategory[catid-1]?.Subcategory.map((item,i)=>{
              return  <Link 
                        to={`/productsbysubcategory/${catname}/${catid}/${item.name}/${item.id}`}
                        key={i}>
                        {item.name}
                      </Link>
            })
          }

        </ul>
        <div className='flex p-[30px] justify-between'>
          <div className='w-[40%]'>
            <div>
              {/* CATEGORIES */}
              <div className='text-[.9em] font-bold '>CATEGORIES</div>
              <div>
                <ul className='flex flex-col'>
                  {
                    dataCategory ?  dataCategory[catid-1]?.Subcategory.map((item,i)=>{
                      return  <Link 
                                  to={`/productsbysubcategory/${catname}/${catid}/${item.name}/${item.id}`}
                                  key={i}>
                                  {item.name}
                              </Link>
                    }) :
                    ''
                  }
                </ul>
              </div>

              {/*  */}
            </div>
          </div>

          <ProductSwiper type={'subcategory'} validId={subid}/>
        </div>
          
      </div>
    </>
  )
}

export default BySubCategory
