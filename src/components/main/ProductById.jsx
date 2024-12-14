import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../services/api'
import { FaMinus, FaPlus, FaWhatsapp } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import { Image } from 'antd';
import { DATA } from '../../context/DataContext'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { BASKET } from '../../context/BasketContext'

function ProductById() {
    const { addToBasket, handleSize, size, setSize, color, handleColor } = useContext(BASKET)
    const { dataFav, handleFavs } = useContext(DATA)

    // const { proid:ayan } = useParams()
    // const proid = ayan.slice("-").at(-1)
    // console.log(proid);
    // const proid = useParams().proid.slice("-").at(-1)
    const { proid } = useParams()
    const [product, setProduct] = useState(null)
    useEffect(() => {
        getProductById({ proid }).then(res => { setProduct(res) })
        // product?.color ? ' ' : handleColor('WHITE')
    }, [proid])



    return (
        <>
            <section className=' pt-[150px]  p-[5px] w-[100%] md:p-[40px] md:pt-[160px]'>
                <div className='w-full flex flex-col md:flex-row justify-start gap-[50px] '>
                    {/* IMAGEDIV */}
                    <div className='flex justify-center'>
                        <Image
                            className='h-[70vh] w-[100%] object-top object-cover cursor-zoom-in '
                            src={product && product.images[0]}
                        />
                    </div>
                    {/* DETAILSDIV */}
                    <div className='text-black flex flex-col gap-[10px] md:w-[50%]'>
                        <p className='font-bold'>{product?.Brands.name}</p>
                        <p className=''>{product?.name}</p>
                        <p className=''>{product?.price} USD</p>
                        {/* COLOR */}
                        <div className='flex gap-[10px]'>Color:
                            {
                                product?.Colors.length > 1 ? product?.Colors.map((item, i) => {
                                    return <div
                                        key={i}
                                        className={` flex items-center justify-center w-[30px] h-[30px] border-2 rounded-full`}
                                        style={{ border: `${item == color ? `1px solid ${item}` : 'none'}` }}
                                        >
                                        <div
                                            className={`cursor-pointer h-[20px] rounded-full w-[20px] `}
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
