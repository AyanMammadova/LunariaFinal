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
      <div className='w-[95%] m-[auto] relative '>
      <div className='h-full absolute  w-full  m-[auto] bg-[#00000080]' ></div>
        <img className='w-full h-[110vh] object-top object-cover' src={imgsfordeps[catid-1]} alt="" />
        <p className='absolute text-[3em] font-serif left-[60px] text-white bottom-[100px]'>{catname}</p>
        <p className='absolute text-[1em] font-serif left-[65px] text-white bottom-[80px]'>New Collection</p>
      </div>
      
    </>
  )
}

export default ByCategory
