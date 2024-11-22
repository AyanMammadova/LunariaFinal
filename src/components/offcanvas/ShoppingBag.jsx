import React from 'react'
import { FaRegSadCry } from 'react-icons/fa'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'

function ShoppingBag({setShowBag}) {
  return (
    <>
      <div className='w-full relative h-[100vh] bg-white z-50 shadow-lg'>
        

        <IoCloseSharp 
        className='absolute top-[20px] right-[20px] cursor-pointer text-[1.2em]' 
        onClick={()=>{setShowBag(false)}}/>

        <p className='font-serif text-[1.2em] p-[20px]'>Shopping Bag</p>
        <HiOutlineShoppingBag className='text-[4em] mx-[auto] mt-[50px] text-center' />
        <p className='font-serif text-[1.5em] text-center'>Your Bag Is Empty</p>
        
        <FaRegSadCry  className='text-[2em] mx-[auto]'/>
        <p className='font-serif text-[0.5em] text-center'>Buy smth loser</p>
      </div> 
    </>
  )
}

export default ShoppingBag
