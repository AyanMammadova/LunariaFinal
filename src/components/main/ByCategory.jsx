import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DATA } from '../../context/DataContext'
import ProductSwiper from './ProductSwiper'

function ByCategory() {
  const {catname,catid}=useParams()
  const {imgsfordeps}=useContext(DATA)
  
  
  return (
    <>
      <section>
        <div className='overflow-hidden h-[100vh]  w-[95%] mx-[auto] relative group'>
          <div className='h-full absolute  w-full  m-[auto] bg-[#35313180] z-10' ></div>
          <img  className=' absolute  top-0 object-top lg:w-full object-cover h-full  transition-all duration-500 group-hover:scale-110' 
                src={imgsfordeps[catid-1]} alt="MainPhoto" />
                <p className='absolute text-[3em] font-serif left-[60px] text-white bottom-[100px]'>{catname}</p>
                <p className='absolute text-[1em] font-serif left-[65px] text-white bottom-[80px]'>New Collection</p>
          <div className='absolute z-20 bottom-[60px] w-[100%] flex-col bp600:flex-row justify-center flex gap-[20px] text-white bp600:w-[40%] bp600:left-[30%]'>
          </div>
        </div>
      </section>
      <section>
        <div className='p-[10px] bp600:p-[40px]'>
          <p className='font-[600] text-[1.2em]'>{catname}</p>
          <ProductSwiper type={catid}/>
        </div>
      </section>
    </>
  )
}

export default ByCategory
