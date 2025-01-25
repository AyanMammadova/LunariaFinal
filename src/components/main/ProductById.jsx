import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../services/api'
import { FaWhatsapp } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import { DATA } from '../../context/DataContext'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { BASKET } from '../../context/BasketContext'
import EcommerceSwiper from './EcommerceSwiper'
import { Helmet } from 'react-helmet'
import { FaCheck } from 'react-icons/fa6'

function ProductById() {
    const { addToBasket, size, setSize, color, setColor } = useContext(BASKET)
    const { dataFav, handleFavs } = useContext(DATA)
    const { proinfo } = useParams()
    const splittedproinfo = proinfo.split("-")
    const proid = splittedproinfo[splittedproinfo.length - 1]
    const [product, setProduct] = useState(null)
    useEffect(() => {
        getProductById({ proid }).then(res => { setProduct(res) })
        setColor(product?.Colors[0])
        setSize(product?.Size[0])
    }, [proid])
    useEffect(() => {
        setColor(product?.Colors[0])
        setSize(product?.Size[0])
    }, [product])
    return (
        <>
            <Helmet>
                <title>Lunaria | {product ? product.name : 'Loading...'}</title>
            </Helmet>
            <section className=' pt-[150px]  p-[5px] w-[100%] md:p-[40px] md:pt-[160px]'>
                {
                    product ? <div className='w-full flex flex-col md:flex-row justify-start gap-[50px] '>
                        {/* IMAGEDIV */}
                        <div className='flex justify-center'>
                            <div className="h-[80%] w-[100%] bp500:w-[450px]">
                                <EcommerceSwiper images={product?.images} />
                            </div>
                        </div>
                        {/* DETAILSDIV */}
                        <div className='text-black flex flex-col   gap-[10px] md:w-[50%]'>
                            <p className='font-bold mx-[10px]'>{product?.Brands.name}</p>
                            <p className=' mx-[10px]'>{product?.name}</p>
                            <p className={`${product?.discount > 1 ? 'block' : 'hidden'} text-black mx-[10px] text-[1.4em]`}>
                                <span className='pr-[10px]'>{((product?.price * (100 - product?.discount)) / 100).toFixed(1)}$</span>
                                <del className='text-gray-600 text-[.8em]'>{product?.price}</del>
                            </p>
                            <p className={`${product?.discount > 1 ? 'hidden' : 'block'} font-bold`}>
                                {product?.price}$
                            </p>
                            {/* COLOR */}
                            <div className='flex mx-[10px] gap-[10px]'>Color:
                                {
                                    product?.Colors.length > 0 ? product?.Colors.map((item, i) => {
                                        return <div
                                            key={i}
                                            className={` flex items-center justify-center  cursor-pointer w-[30px] shadow-lg  h-[30px] rounded-full ${item == 'WHITE' ? `border-[1px] border-black` : ""}`}
                                            style={{ backgroundColor: item }}
                                            onClick={() => { setColor(item) }}
                                        >
                                            <FaCheck className={`${item == color ? 'block' : 'hidden'} ${item == 'BLACK' || item == 'BLUE' || item == 'PURPLE' || item == 'GREEN' ? 'text-white' : ''}`} />
                                        </div>
                                    }) :
                                        <div className='font-thin'>There is no color options</div>
                                }

                            </div>
                            {/* SIZE */}
                            <div className='flex mx-[10px] gap-[5px] flex-wrap'>
                                {
                                    product?.Size.map((item, i) => (
                                        <div
                                            onClick={() => { setSize(item) }}
                                            className={`${item == size ? 'border-black' : 'border-gray-200'} px-[26px] py-[2px] border-2 cursor-pointer   transition-all duration-300`}
                                            key={i}>
                                            {item}
                                        </div>)
                                    )
                                }
                            </div>
                            {/* BUTTONS */}
                            <div className='flex pt-[30px] flex-col gap-[10px] w-[90%] mx-[auto] '>
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
                                <Link
                                    to="#"
                                    onClick={() =>
                                        window.open(
                                            "https://wa.me/9940702561065?text=Hello!%20I'm%20reaching%20out%20via%20WhatsApp.",
                                            "_blank"
                                        )
                                    }
                                    className='h-[45px] flex w-[100%] mx-[auto] gap-[10px] items-center justify-center  transition-all duration-300 border-[1px] border-black  bg-white text-black hover:bg-black hover:text-white'
                                >
                                    <FaWhatsapp />SEND US A MESSAGE
                                </Link>
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
                    </div> :  <div className="w-12 h-12 mx-[auto] border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                   
                }
            </section>

        </>
    )
}

export default ProductById
