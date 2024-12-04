import React, { useContext } from 'react'
import { FaRegSadCry } from 'react-icons/fa'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'
import { BASKET } from '../../context/BasketContext'

function ShoppingBag({ setShowBag }) {
  const { basket ,removeFromBasket} = useContext(BASKET)
  return (
    <>
      <div className='w-full relative h-[100vh] bg-white z-50 shadow-lg'>

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
                    onClick={()=>{removeFromBasket(item.id)}}
                    className='absolute cursor-pointer top-[10px] right-[10px]' />
                    <div>
                      <p className='uppercase'>{item?.brand}</p>
                      <p>{item.name}</p>
                      <p>{ }</p>
                      <p>{item.price * item.quantity}$</p>
                      <p>Quantity:{item.quantity}</p>
                    </div>
                  </div>
          }
          )
        }
        {/* {
          basket.length > 1
            ? <div>
              {
                basket.map((item, i) => {
                  return <div key={i}>
                    <img src={item?.images[0]} alt="" />
                    <p></p>
                  </div>
                })
              }
            </div>
            : <div className={`${basket.length > 0 ? 'block' : 'hidden'}`}>
              <p className='font-serif text-[1.2em] p-[20px]'>Shopping Bag</p>
              <HiOutlineShoppingBag className='text-[4em] mx-[auto] mt-[50px] text-center' />
              <p className='font-serif text-[1.5em] text-center'>Your Bag Is Empty</p>

              <FaRegSadCry className='text-[2em] mx-[auto]' />
              <p className='font-serif text-[0.7em] text-center'>Buy smth loser</p>
            </div>
        } */}

      </div>
    </>
  )
}

export default ShoppingBag
