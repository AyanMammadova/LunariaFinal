import React from 'react'
import { useParams } from 'react-router-dom'

function ByCategory() {
  const {catname,catid}=useParams()
  console.log({catname,catid})
  
  return (
    <>
      
    </>
  )
}

export default ByCategory
