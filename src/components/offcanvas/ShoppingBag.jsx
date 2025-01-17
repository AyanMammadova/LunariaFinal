import React, { useContext, useEffect, useState } from 'react'
import { FaRegSadCry } from 'react-icons/fa'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'
import { BASKET } from '../../context/BasketContext'
import { Link } from 'react-router-dom'
import { FaRegSquareMinus, FaRegSquarePlus } from 'react-icons/fa6'
import { DATA } from '../../context/DataContext'

function ShoppingBag({ setShowBag }) {
  const { basket, removeFromBasket, SubTotal, handleCount,setUpdateColor,setUpdateSize,setUpdating } = useContext(BASKET)
  const { setShowQuick, quickId, setQuickId } = useContext(DATA)

  return (
    <>
      <div
        className='w-full relative overflow-y-scroll scrollbar-hidden h-[100vh] bg-white z-40 shadow-lg'>
        <IoCloseSharp
          className='absolute top-[20px] right-[20px] cursor-pointer text-[1.2em]'
          onClick={() => { setShowBag(false) }} />
        <p className='font-serif text-[1.2em] p-[20px]'>Shopping Bag</p>
        <div className={`${basket.length > 0 ? 'hidden' : 'block'}`}>

          <HiOutlineShoppingBag className='text-[4em] mx-[auto] mt-[50px] text-center' />
          <p className='font-serif text-[1.5em] text-center'>Your Bag Is Empty</p>
    
        </div>
        {
          basket && basket.map((item, i) => {
            return <div key={i}>
              <div className='flex border-b-2 mx-[5px] p-[4px] gap-[10px] relative'>
                <div
                  className='h-[200px]  w-[200px]  relative flex items-center justify-center group cursor-pointer'
                >
                  <img
                    className={`group-hover:hidden transition-opacity duration-300 ease-in-out `}
                    src={item.images[0]}
                  />
                  <img
                    className={`hidden z-20 group-hover:block transition-opacity duration-300 ease-in-out`}
                    src={item.images[1]}
                  />
                  <div className=" bg-black/20 w-[100%] h-[100%] z-50 absolute opacity-0 inset-0 group-hover:opacity-100 transition-all duration-200 ease-in-out">
                    <div
                      onClick={() => {
                        setShowQuick(true)
                        setQuickId(item.id)
                        setUpdateColor(item.color)
                        setUpdateSize(item.size)
                        setUpdating(true)
                      }}
                      className='flex justify-center w-[100%] h-[100%] items-center transition-all duration-500'>
                      <p className='text-[1.2em] font-cormorant rounded-full px-[7px] bg-white/70 '>Update</p>
                    </div>
                  </div>

                </div>

                <div>
                  <IoCloseSharp
                    onClick={() => {
                      removeFromBasket(item.id, item.size, item.color)
                    }}
                    className='absolute cursor-pointer top-[10px] right-[10px]' />
                </div>

                <div className='w-[100%] pt-[30px]'>
                  <p>{item.name}</p>
                  <div className='flex gap-[20px]'>
                    <p className='flex items-center  gap-[5px]'>Color:
                      <span
                        className={`cursor-pointer h-[15px] border-[1px] rounded-full w-[15px] `}
                        style={{ backgroundColor: item.color }}>
                      </span>
                    </p>
                    <p>Size:{item.size}</p>
                  </div>

                  <p className={`${item?.discount > 1 ? 'block' : 'hidden'} text-black text-[1.2em]`}>
                    <span>{((item?.price * (100 - item?.discount)) / 100).toFixed(1)}$</span>
                    <del className='text-gray-600 px-[5px] text-[.8em]'>{item?.price}</del>
                  </p>
                  <p className={`${item?.discount > 1 ? 'hidden' : 'block'} text-[1.2em]`}>
                    {item?.price}$
                  </p>
                  <div>
                    <p className='flex gap-[5px] items-center'>Quantity:
                      <FaRegSquareMinus
                        className={`${item.quantity == 1 ? 'text-gray-400' : ''} cursor-pointer `}
                        onClick={() => {
                          handleCount(item.id, item.color, item.size, -1)
                        }} />
                      {item.quantity}
                      <FaRegSquarePlus
                        className='cursor-pointer'
                        onClick={(e) => {
                          handleCount(item.id, item.color, item.size, +1)
                        }} />
                    </p>
                  </div>

                  <p className={`${item.discount > 1 ? 'hidden' : 'block'} font-bold text-right`}>ItemTotal: {item.quantity * item.price}$</p>
                  <p className={`${item.discount > 1 ? 'block' : 'hidden'} font-bold text-right`}>ItemTotal: {item.quantity * (item.price * ((100 - item.discount)) / 100).toFixed(2)}$</p>
                </div>
                <hr />
              </div>
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
