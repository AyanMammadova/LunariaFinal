import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../services/api'
import { IoMdHeartEmpty } from 'react-icons/io'
import { FaWhatsapp } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Image } from 'antd';
import { BAKSET } from '../../context/BasketContext'

function ProductById() {
    const {addToBasket}=useContext(BAKSET)
    const notify = () => toast(`Product Added to Your Bag ☻`);
    const {proid}=useParams()
    const [product,setProduct]=useState(null)
    useEffect(()=>{
        getProductById({proid}).then(res=>{setProduct(res)})
    },[proid])

    return (
        <>
            <section className=' pt-[150px]  p-[5px] w-[100%] md:p-[40px] md:pt-[160px]'>
                <div className='w-full flex flex-col md:flex-row justify-start gap-[50px] '>
                    {/* IMAGEDIV */}
                    <div className='flex justify-center'>
                        <Image 
                            className='h-[70vh] w-[100%] object-top object-cover cursor-zoom-in ' 
                            src={product &&  product.images[0]}
                            alt="" 
                        />
                    </div>
                    {/* DETAILSDIV */}
                    <div className='text-black flex flex-col gap-[10px] md:w-[50%]'>
                        <p className='font-bold'>{product?.Brands.name}</p>
                        <p className=''>{product?.name}</p>
                        <p className=''>{product?.price} USD</p>
                        {/* COLOR */}
                        <div className=''>Color:
                            {
                                product?.Colors.length>1 ?  product?.Colors.map((item,i)=>{
                                    return <div key={i} className={`cursor-pointer h-[25px] rounded-full w-[25px] bg-${item.toLowerCase()}`}></div>
                                }) :
                                <div className='font-thin'>There is no color options</div>
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
                        <div className='flex pt-[30px] flex-col gap-[10px] *:w-[100%]'>
                            <div className='h-[45px] items-center flex justify-center cursor-pointer transition-all text-center duration-300 border-[1px] border-black bg-black text-white hover:bg-white hover:text-black ' onClick={notify}>
                                <button
                                    onClick={()=>{addToBasket(product.id,product.name,product.description,product.price,product.discount,product.Brands.name)}}
                                >
                                    ADD TO CARD
                                </button>
                                <ToastContainer/>
                            </div>
                            <button className='h-[45px] flex  gap-[10px] items-center justify-center  transition-all duration-300 border-[1px] border-black  bg-white text-black hover:bg-black hover:text-white'> 
                                <FaWhatsapp />SEND US A MESSAGE
                            </button>
                            <button className='h-[45px]  flex gap-[10px] items-center justify-center  transition-all duration-300 border-[1px] border-black  bg-white text-black hover:bg-black hover:text-white '>
                                <IoMdHeartEmpty />ADD TO WISHLIST
                            </button>
                        </div>
                        <div className='pt-[50px]'>
                            <span className='font-serif font-[600] '>Description:</span> <br />
                            {product?.description}
                        </div>

                        
                    </div>
                </div>
            </section>
    
        </>
    )
}

export default ProductById
