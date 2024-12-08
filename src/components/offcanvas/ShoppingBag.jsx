import React, { useContext, useEffect, useState } from 'react'
import { FaRegSadCry } from 'react-icons/fa'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'
import { BASKET } from '../../context/BasketContext'
import { Link } from 'react-router-dom'

function ShoppingBag({ setShowBag }) {
  const { basket, removeFromBasket,SubTotal } = useContext(BASKET)

  

  return (
    <>
      <div
        className='w-full relative overflow-y-scroll h-[100vh] bg-white z-50 shadow-lg'>

        <IoCloseSharp
          className='absolute top-[20px] right-[20px] cursor-pointer text-[1.2em]'
          onClick={() => { setShowBag(false) }} />
        <p className='font-serif text-[1.2em] p-[20px]'>Shopping Bag</p>
        <div className={`${basket.length > 0 ? 'hidden' : 'block'}`}>

          <HiOutlineShoppingBag className='text-[4em] mx-[auto] mt-[50px] text-center' />
          <p className='font-serif text-[1.5em] text-center'>Your Bag Is Empty</p>

          <FaRegSadCry className='text-[2em] mx-[auto]' />
          <p className='font-serif text-[0.7em] text-center'>Buy smth loser</p>
        </div>
        {
          basket && basket.map((item, i) => {
            return <div className='flex border-b-2 mx-[5px] p-[4px] gap-[40px] relative' key={i}>
              <img className='h-[100px]' src={item?.images?.[0]} alt="" />
              <IoCloseSharp
                onClick={() => { removeFromBasket(item.id) }}
                className='absolute cursor-pointer top-[10px] right-[10px]' />
              <div>
                <p className='uppercase'>{item?.brand}</p>
                <p>{item.name}</p>
                <p>Size:{item.size}</p>

                <p>Price: {item.price}$</p>
                <p>Quantity: {item.quantity}</p>
                <p className='font-bold'>ItemTotal: {item.quantity * item.price}$</p>
              </div>
              <hr />
            </div>
          }
          )
        }
        <div className={`${basket.length > 0 ? 'block' : 'hidden'} w-[100%] p-[10px] bp600:p-[20px]`}>
          <p className='flex w-full  justify-between'>ItemsTotal:  <span>${SubTotal}$</span> </p>
          <p className='flex w-full justify-between py-[10px]'>Delivery:  <span>FREE</span></p>
          <p className='flex w-full justify-between'>SubTotal:  <span>${SubTotal}</span></p>
          <Link to={'/shoppingbagpage'}>
            <button className='bg-black text-white transition-all font-montserrat duration-200 hover:bg-white hover:text-black text-center w-[100%] rounded mt-[20px] h-[40px] border-[1px] border-black'>
              GO TO CART
            </button>
          </Link>
          <button onClick={()=>{setShowBag(false)}} className=' underline text-center w-[100%] font-montserrat py-[20px]'>
            CONTINUE SHOPPING
          </button>
        </div>

      </div>
    </>
  )
}

export default ShoppingBag
