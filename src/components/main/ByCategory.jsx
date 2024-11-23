import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataByCategory } from '../../services/api'
import { DATA } from '../../context/DataContext'

function ByCategory() {
  const {catname,catid}=useParams()
  const {imgsfordeps}=useContext(DATA)
  useEffect(()=>{
      getDataByCategory(catid).then(res=>{console.log(res.data)})
  },[catid])
  
  return (
    <>
      <div className='overflow-hidden h-[100vh]  w-[95%] mx-[auto] relative group'>
        <div className='h-full absolute  w-full  m-[auto] bg-[#35313180] z-10' ></div>
        <img  className=' absolute  top-0 object-top lg:w-full object-cover h-full  transition-all duration-500 group-hover:scale-110' 
              src={imgsfordeps[catid-1]} alt="MainPhoto" />
              <p className='absolute text-[3em] font-serif left-[60px] text-white bottom-[100px]'>{catname}</p>
              <p className='absolute text-[1em] font-serif left-[65px] text-white bottom-[80px]'>New Collection</p>
        <div className='absolute z-20 bottom-[60px] w-[100%] flex-col bp600:flex-row justify-center flex gap-[20px] text-white bp600:w-[40%] bp600:left-[30%]'>
        </div>
      </div>
      {/* <div className='w-[95%] m-[auto] relative group'>
      <div className='h-full absolute overflow-hidden  w-full  m-[auto] bg-[#00000080]' ></div>
        <img className='w-full h-[110vh] transition-all duration-150 group-hover:scale-110 object-top object-cover' src={imgsfordeps[catid-1]} alt="" />
        <p className='absolute text-[3em] font-serif left-[60px] text-white bottom-[100px]'>{catname}</p>
        <p className='absolute text-[1em] font-serif left-[65px] text-white bottom-[80px]'>New Collection</p>
      </div> */}
      
    </>
  )
}

export default ByCategory
