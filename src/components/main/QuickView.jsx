import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { getProductById } from '../../services/api'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';


function QuickView({proid,setShowQuick}) {
  const notify = () => toast(`Product Added to Your Bag ☻`);
  const [product,setProduct]=useState(null)
    useEffect(()=>{
        getProductById({proid}).then(res=>{setProduct(res)})
    },[proid])
    console.log(product)
  return (
    <>
      <div className='w-[60%]  relative h-[60vh] bg-white'>
        <IoCloseSharp 
          onClick={()=>{setShowQuick(false)}}
         className='absolute cursor-pointer top-[20px] right-[20px]' />
        <div className='w-full flex items-center pt-[20px] flex-col md:flex-row justify-start gap-[50px] '>
                {/* IMAGEDIV */}
                <div className='flex justify-between'>
                    <img 
                        className='h-[300px] object-top object-cover cursor-zoom-in ' 
                        src={product &&  product.images[0]}
                        alt="" 
                    />
                </div>
                {/* DETAILSDIV */}
                <div className='text-black flex flex-col gap-[10px] md:w-[60%]'>
                    <p className='font-bold'>{product?.Brands.name}</p>
                    <p className=''>{product?.name}</p>
                    <p className=''>{product?.price} USD</p>
                    {/* COLOR */}
                    <div className=''>Color:
                        {
                            product?.Colors.map((item,i)=>{
                                return <div key={i} className={`cursor-pointer h-[25px] rounded-full w-[25px] bg-${item.toLowerCase()}`}></div>
                            })
                        }
                        
                    </div>
                    {/* SIZE */}
                    <div className='flex gap-[5px] flex-wrap'>
                        {
                            product?.Size.map((item,i)=>{
                                return <div className='px-[26px] py-[2px] border-2 cursor-pointer border-gray-800 hover:text-white hover:bg-black transition-all duration-300' key={i}>{item}</div>
                            })
                        }
                    </div>
                    <div className='flex  pt-[30px] items-center justify-between  gap-[10px] *:w-[100%]'>
                        <div className='h-[45px] min-w-[95%] items-center flex justify-center cursor-pointer transition-all text-center duration-300 border-[1px] border-black bg-black text-white hover:bg-white hover:text-black ' onClick={notify}>
                            <button>
                                ADD TO CARD
                            </button>
                            <ToastContainer/>
                        </div>
                        <div>
                          <FaRegHeart  className='text-[1.5em]'/>
                        </div>
                        
                    </div>
                    <div className=''>
                        <Link to={`/productbyid/${proid}`}>
                         <p className='underline'>View Product page</p>
                        </Link>
                    </div>

                    
                </div>
            </div>
      </div>
    </>
  )
}

export default QuickView
