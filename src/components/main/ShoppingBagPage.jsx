import React, { useContext } from 'react'
import { BASKET } from '../../context/BasketContext'
import { IoCloseSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaRegSquareMinus, FaRegSquarePlus } from 'react-icons/fa6'
import { Helmet } from 'react-helmet'
import { DATA } from '../../context/DataContext'

function ShoppingBagPage() {
    const { basket, removeFromBasket, handleCount, SubTotal,setUpdateColor,setUpdateSize,setUpdating } = useContext(BASKET)
    const { setShowQuick,setQuickId } = useContext(DATA)

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
                            <div key={i}>
                                <div className='flex border-t-2 pt-[20px] mx-[5px] p-[4px] gap-[40px] relative' >
                                    <div
                                        className='h-[180px]    relative flex items-center justify-center group cursor-pointer'
                                    >
                                        <img
                                            className={`group-hover:hidden transition-opacity duration-300 ease-in-out `}
                                            src={item.images[0]}
                                        />
                                        <img
                                            className={`hidden z-20 group-hover:block transition-opacity duration-300 ease-in-out`}
                                            src={item.images[1]}
                                        />
                                        <div className=" bg-black/20 w-[100%] h-[100%] z-40 absolute opacity-0 inset-0 group-hover:opacity-100 transition-all duration-200 ease-in-out">
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
                                    <IoCloseSharp
                                        onClick={(e) => {
                                            removeFromBasket(item.id, item.size, item.color)
                                            e.preventDefault()
                                        }}
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
                                        <p className={`${item?.discount > 1 ? 'block' : 'hidden'} text-black text-[1.2em]`}>
                                            <span>{((item?.price * (100 - item?.discount)) / 100).toFixed(1)}$</span>
                                            <del className='text-gray-600 px-[5px] text-[.8em]'>{item?.price}</del>
                                        </p>
                                        <p className={`${item?.discount > 1 ? 'hidden' : 'block'} text-[1.2em]`}>
                                            {item?.price}$
                                        </p>
                                        <p className='flex gap-[5px] items-center'>Quantity:
                                            <FaRegSquareMinus
                                                className={`${item.quantity == 1 ? 'text-gray-400' : ''} cursor-pointer `}
                                                onClick={(e) => {
                                                    handleCount(item.id, item.color, item.size, -1)
                                                    e.preventDefault()
                                                }} />
                                            {item.quantity}
                                            <FaRegSquarePlus
                                                className='cursor-pointer'
                                                onClick={(e) => {
                                                    handleCount(item.id, item.color, item.size, +1)
                                                    e.preventDefault()
                                                }} />
                                        </p>
                                        <p className={`${item.discount > 1 ? 'hidden' : 'block'} font-bold w-[50vw] text-right`}>ItemTotal: {item.quantity * item.price}$</p>
                                        <p className={`${item.discount > 1 ? 'block' : 'hidden'} font-bold w-[50vw] text-right`}>ItemTotal: {item.quantity * (item.price * ((100 - item.discount)) / 100).toFixed(2)}$</p>

                                    </div>
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
