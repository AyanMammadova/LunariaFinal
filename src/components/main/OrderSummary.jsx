import React, { useContext } from 'react'

import { IoCloseSharp } from "react-icons/io5";
import { BASKET } from '../../context/BasketContext';
import { FaRegSquareMinus, FaRegSquarePlus } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';

function OrderSummary({ urgent, setShowOrderSumFull, pickup }) {

    const { basket, SubTotal, removeFromBasket, handleCount } = useContext(BASKET);
    return (
        <>
            <div>

                <div
                    className={`bg-[#F7F7F2] mt-[10px] lg:block h-[70vh] w-[100%] 
                    `}
                >
                    <p className="text-[1.3em] flex justify-between font-cormorant py-[20px] border-b-[1px] mx-[10px]  bp600:mx-[40px]">
                        <span>Order Summary</span>
                        <IoIosArrowDown
                            onClick={() => { setShowOrderSumFull(false) }}
                            className="text-[1.3em]  z-50 cursor-pointer"
                        />
                    </p>
                    {/* BASKETDIV */}
                    <div className="h-[50%] font-montserrat text-[.9em] text-gray-500 overflow-y-scroll">
                        {basket &&
                            basket.map((item, i) => {
                                return (
                                    <div
                                        className="flex  border-b-2 mx-[15px] items-center  p-[4px] gap-[20px] relative"
                                        key={i}
                                    >
                                        <img
                                            className="h-[100px]"
                                            src={item?.images?.[0]}
                                        />
                                        <IoCloseSharp
                                            onClick={() => {
                                                removeFromBasket(item.id, item.size, item.color);
                                            }}
                                            className="absolute cursor-pointer top-[10px] right-[10px]"
                                        />
                                        <div>
                                            <p className="uppercase">{item?.brand}</p>
                                            <p className='text-black '>{item.name}</p>
                                            <div className='flex gap-[20px]'>
                                                <p>Size:{item.size}</p>
                                                <p className='flex items-center  gap-[5px]'>Color:
                                                    <span
                                                        className={`cursor-pointer h-[15px] rounded-full w-[15px] `}
                                                        style={{ backgroundColor: item.color }}>
                                                    </span>
                                                </p>
                                            </div>
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
                                                    }} />
                                                {item.quantity}
                                                <FaRegSquarePlus
                                                    className='cursor-pointer'
                                                    onClick={() => { handleCount(item.id, item.color, item.size, +1) }} />
                                            </p>
                                            <p className={`${item.discount > 1 ? 'hidden' : 'block'} font-bold text-right`}>ItemTotal: {item.quantity * item.price}$</p>
                                            <p className={`${item.discount > 1 ? 'block' : 'hidden'} font-bold text-right`}>ItemTotal: {item.quantity * (item.price * ((100 - item.discount)) / 100).toFixed(2)}$</p>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })}
                    </div>
                    <p className="flex px-[15px] w-full  justify-between">
                        ItemsTotal:{" "}
                        <span>${urgent ? `${SubTotal + 15}` : `${SubTotal}`}$</span>{" "}
                    </p>
                    <p className={`${pickup ? 'hidden' : 'block'} flex px-[15px] w-full justify-between py-[5px]`}>
                        Delivery: <span>{urgent ? `15$` : `FREE`}</span>
                    </p>
                    <p className="flex px-[15px] w-full justify-between">
                        SubTotal:{" "}
                        <span>${urgent ? `${SubTotal + 15}` : `${SubTotal}`}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default OrderSummary
