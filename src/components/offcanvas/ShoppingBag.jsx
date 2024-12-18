import React, { useContext, useEffect, useState } from 'react'
import { FaRegSadCry } from 'react-icons/fa'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'
import { BASKET } from '../../context/BasketContext'
import { Link } from 'react-router-dom'
import { FaRegSquareMinus, FaRegSquarePlus } from 'react-icons/fa6'

function ShoppingBag({ setShowBag }) {
  const { basket, removeFromBasket, SubTotal, handleCount } = useContext(BASKET)



  return (
    <>
      <div
        className='w-full relative overflow-y-scroll h-[150vh] bg-white z-50 shadow-lg'>

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
            return <div className='flex border-b-2 mx-[5px] p-[4px] gap-[10px] relative' key={i}>
              <div className='h-[200px]  w-[200px] flex items-center justify-center'>
                <img className=' object-cover ' src={item?.images?.[0]} alt="" />
              </div>
              <IoCloseSharp
                onClick={() => { removeFromBasket(item.id, item.size, item.color) }}
                className='absolute bg-white cursor-pointer top-[10px] right-[10px]' />
              
              <div className='w-[100%] pt-[30px]'>
                <p>{item.name}</p>
                <div className='flex gap-[20px]'>
                  <p className='flex items-center  gap-[5px]'>Color:
                    <span
                      className={`cursor-pointer h-[15px] rounded-full w-[15px] `}
                      style={{ backgroundColor: item.color }}>
                    </span>
                  </p>
                  <p>Size:{item.size}</p>
                </div>

                <p>Price: {item.price}$</p>
                <p className='flex gap-[5px] items-center'>Quantity:
                  <FaRegSquareMinus
                    className={`${item.quantity == 1 ? 'text-gray-400' : ''} cursor-pointer `}
                    onClick={(e) => {
                      handleCount(item.id, item.color, item.size, -1);
                      e.stopPropagation()
                    }} />
                  {item.quantity}
                  <FaRegSquarePlus
                    className='cursor-pointer'
                    onClick={() => { handleCount(item.id, item.color, item.size, +1) }} />
                </p>
                <p className='font-bold text-right'>ItemTotal: {item.quantity * item.price}$</p>
              </div>
              <hr />
            </div>
          }
          )
        }
        <div className={`${basket.length > 0 ? 'block' : 'hidden'} w-[100%] p-[10px] bp600:p-[20px]`}>
          <p className='flex w-full  justify-between'>ItemsTotal:  <span>{SubTotal}$</span> </p>
          <p className='flex w-full justify-between py-[10px]'>Delivery:  <span>FREE</span></p>
          <p className='flex w-full justify-between'>SubTotal:  <span>{SubTotal}$</span></p>
          <Link to={'/shoppingbagpage'}>
            <button className='bg-black text-white transition-all font-montserrat duration-200 hover:bg-white hover:text-black text-center w-[100%] rounded mt-[20px] h-[40px] border-[1px] border-black'>
              GO TO CART
            </button>
          </Link>
          <button onClick={() => { setShowBag(false) }} className=' underline text-center w-[100%] font-montserrat py-[20px]'>
            CONTINUE SHOPPING
          </button>
        </div>

      </div>
    </>
  )
}

export default ShoppingBag
