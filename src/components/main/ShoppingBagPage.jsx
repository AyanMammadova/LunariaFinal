import React, { useContext } from 'react'
import { BASKET } from '../../context/BasketContext'
import { IoCloseSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaRegSquareMinus, FaRegSquarePlus } from 'react-icons/fa6'
import { Helmet } from 'react-helmet'

function ShoppingBagPage() {
    const { basket, removeFromBasket, handleCount } = useContext(BASKET)
    const SubTotal = basket.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <>
            <Helmet>
                <title>ShoppingBag | Lunaria</title>
            </Helmet>
            <div className='w-[100%] flex flex-col bp800:flex-row pt-[150px] gap-[40px] text-[.9em] text-gray-800 p-[10px] '>
                <div className='w-[100%] bp800:w-[70%]'>
                    <div className=''>
                        <p className='font-cormorant  text-[2em] bp600:text-[3em]'>Shopping Bag</p>
                        <p className='font-montserrat'>{basket.length} items</p>
                    </div>
                    {
                        basket && basket.map((item, i) => (
                            <div className='flex border-t-2 pt-[20px] mx-[5px] p-[4px] gap-[40px] relative' key={i}>
                                <img className='h-[100px]' src={item?.images?.[0]} alt="" />
                                <IoCloseSharp
                                    onClick={() => { removeFromBasket(item.id) }}
                                    className='absolute cursor-pointer top-[10px] right-[10px]' />
                                <div>
                                    <p className='uppercase'>{item?.brand}</p>
                                    <p>{item.name}</p>
                                    <p className='flex items-center  gap-[5px]'>Color:
                                        <span
                                            className={`cursor-pointer h-[15px] rounded-full w-[15px] `}
                                            style={{ backgroundColor: item.color }}>
                                        </span>
                                    </p>
                                    <p>Size:{item.size}</p>
                                    <p>Price: {item.price}$</p>
                                    <p className='flex gap-[5px] items-center'>Quantity:
                                        <FaRegSquareMinus
                                            className={`${item.quantity == 1 ? 'text-gray-400' : ''} cursor-pointer `}
                                            onClick={(e) => {
                                                handleCount(item.id, item.color, item.size, -1)
                                            }} />
                                        {item.quantity}
                                        <FaRegSquarePlus
                                            className='cursor-pointer'
                                            onClick={() => { handleCount(item.id, item.color, item.size, +1) }} />
                                    </p>
                                    <p className='font-bold'>ItemTotal: {item.quantity * item.price}$</p>
                                </div>
                            </div>
                        )
                        )
                    }
                </div>
                <div className='w-[100%] bp800:w-[30%] font-montserrat pt-[35px] *:py-[10px] '>
                    <p className='font-cormorant text-[1.5em] border-b-2 '>Order Summary</p>
                    <p className='flex w-full  justify-between uppercase'>Items Total:  <span>{SubTotal}$</span> </p>
                    <p className='flex w-full justify-between py-[10px] uppercase'>Delivery:  <span>FREE</span></p>
                    <div>
                        <p>Promo code (Mobile number)</p>
                        <input type="text" className='h-[50px] border-[1px] p-[10px] w-[100%]' placeholder='Mobile Number' />
                    </div>
                    <p className='flex w-full justify-between uppercase'>SubTotal:  <span>${SubTotal}</span></p>
                    <Link to={'/checkout'}>
                        <button className='bg-black text-white transition-all font-montserrat duration-200 hover:bg-white hover:text-black text-center w-[100%] rounded mt-[20px] h-[40px] border-[1px] border-black'>
                            CONTINUE TO CHECKOUT
                        </button>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default ShoppingBagPage
