import React, { useContext, useState } from 'react'
import { IoPersonOutline } from 'react-icons/io5'
import { DATA } from '../../context/DataContext'
import { Link, NavLink } from 'react-router-dom'

function CategorySlide() {
  const {dataCategory}=useContext(DATA)
  const [id,setId]=useState(null)
  function showSubs(ids){
    const news=ids
    setId(ids)
  }
  return (
    <>
      <div className={`w-[100vw] relative flex  z-50  h-[100vh] bg-white`}>
        <div className=' w-[100px] flex items-center justify-around p-[10px] absolute top-[30px] right-[30px] border-[1px] border-gray-300'>
          <IoPersonOutline />
          <p>Sign in</p>
        </div>
        <div className='absolute top-[100px] left-[20px]'>
          <ul className='flex max-w-[100%] overflow-hidden gap-[10px]'>
            {
              dataCategory && dataCategory.map((item,i)=>{
                return  <NavLink 
                          className='cursor-pointer navlarim rounded  hover:bg-gray-200 px-[10px] p-[4px]' 
                          onClick={()=>{showSubs(item.id)}} 
                          key={i}>{item.name}
                        </NavLink>
              })
            }
          </ul>
          <ul className='text-[.8em] flex flex-col  pt-[30px] font-bold'>
            {
              id ?  <Link to={`/category/${dataCategory[id-1]?.name}`}>
                      {dataCategory[id-1]?.name}-HomePage
                    </Link> : ''
            }
            
            {
              dataCategory ? dataCategory[id-1]?.Subcategory?.map((subitem,subi)=>{
                return  <Link 
                          to={`/products/${dataCategory[id-1]?.name}/${subitem.name}`}
                          key={subi}>
                          {subitem.name}
                        </Link>
              }) : 
               ''
            }
          </ul>

        </div>

      </div>
    </>
  )
}

export default CategorySlide