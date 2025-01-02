import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../services/api'
import { FaMinus, FaPlus, FaWhatsapp } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import { DATA } from '../../context/DataContext'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { BASKET } from '../../context/BasketContext'
import EcommerceSwiper from './EcommerceSwiper'
import { Helmet } from 'react-helmet'

function ProductById() {
    const { addToBasket, handleSize, size, setSize, color, handleColor } = useContext(BASKET)
    const { dataFav, handleFavs } = useContext(DATA)

    const { proinfo } = useParams()
    const splittedproinfo = proinfo.split("-")
    const proid = splittedproinfo[splittedproinfo.length - 1]


    const [product, setProduct] = useState(null)
    useEffect(() => {
        getProductById({ proid }).then(res => { setProduct(res) })
    }, [proid])
    return (
        <>
            <Helmet>
                <title>Lunaria | {product ? product.name : 'Loading...'}</title>
            </Helmet>
            <section className=' pt-[150px]  p-[5px] w-[100%] md:p-[40px] md:pt-[160px]'>
                <div className='w-full flex flex-col md:flex-row justify-start gap-[50px] '>
                    {/* IMAGEDIV */}
                    <div className='flex justify-center'>
                        <div className="h-[80%] w-[400px]">
                            <EcommerceSwiper images={product?.images} />
                        </div>
                    </div>
                    {/* DETAILSDIV */}
                    <div className='text-black flex flex-col gap-[10px] md:w-[50%]'>
                        <p className='font-bold'>{product?.Brands.name}</p>
                        <p className=''>{product?.name}</p>
                        <p className={`${product?.discount > 1 ? 'block' : 'hidden'} text-black text-[1.4em]`}>
                            <span className='pr-[10px]'>{((product?.price * (100 - product?.discount)) / 100).toFixed(1)}$</span>
                            <del className='text-gray-600 text-[.8em]'>{product?.price}</del>
                        </p>
                        <p className={`${product?.discount > 1 ? 'hidden' : 'block'} font-bold`}>
                            {product?.price}$
                        </p>
                        {/* COLOR */}
                        <div className='flex gap-[10px]'>Color:
                            {
                                product?.Colors.length > 0 ? product?.Colors.map((item, i) => {
                                    return <div
                                        key={i}
                                        className={` flex items-center justify-center w-[30px] shadow-lg  h-[30px] border-2 rounded-full`}
                                        style={{ border: `${item == color ? `1px solid ${item}` : 'none'}` }}
                                    >
                                        <div
                                            className={`${item == 'WHITE' ? 'border-[1px] border-gray-400' : ''} cursor-pointer h-[20px] rounded-full w-[20px] `}
                                            style={{ backgroundColor: item }}
                                            onClick={() => { handleColor(item) }}
                                        ></div>
                                    </div>
                                }) :
                                    <div className='font-thin'>There is no color options</div>
                            }

                        </div>
                        {/* SIZE */}
                        <div className='flex gap-[5px] flex-wrap'>
                            {
                                product?.Size.map((item, i) => (
                                    <div
                                        onClick={() => { handleSize(item) }}
                                        className={`${item == size ? 'border-black' : 'border-gray-200'} px-[26px] py-[2px] border-2 cursor-pointer   transition-all duration-300`}
                                        key={i}>
                                        {item}
                                    </div>)
                                )
                            }
                        </div>
                        {/* BUTTONS */}
                        <div className='flex pt-[30px] flex-col gap-[10px] *:w-[100%]'>
                            <div
                                onClick={() => {
                                    if (size && color) {
                                        addToBasket(
                                            product?.id,
                                            product.name,
                                            product.description,
                                            product.price,
                                            product.discount,
                                            product.Brands.name,
                                            product.images,
                                            size,
                                            color
                                        );
                                        toast.success('Product added to basket succesfully')
                                    }
                                    else {
                                        return toast.error(size ? 'Select Color pls' : 'Select Size pls')
                                    }
                                }}
                                className='h-[45px] items-center flex justify-center cursor-pointer transition-all text-center duration-300 border-[1px] border-black bg-black text-white hover:bg-white hover:text-black ' >
                                <button
                                >
                                    ADD TO CARD
                                </button>
                            </div>
                            <button className='h-[45px] flex  gap-[10px] items-center justify-center  transition-all duration-300 border-[1px] border-black  bg-white text-black hover:bg-black hover:text-white'>
                                <FaWhatsapp />SEND US A MESSAGE
                            </button>
                            <Toaster
                                position="top-right"
                                reverseOrder={false}
                            />
                            <button
                                onClick={() => { handleFavs(product?.id) }}
                                className='h-[45px]  flex gap-[10px] items-center justify-center  transition-all duration-300 border-[1px] border-black  bg-white text-black hover:bg-black hover:text-white '>
                                {
                                    dataFav && dataFav.find(itema => itema.id == product?.id) ?
                                        <>
                                            <GoHeartFill />
                                            Remove from favs
                                        </>
                                        :
                                        <>
                                            <GoHeart />
                                            Add to favs
                                        </>
                                }

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
