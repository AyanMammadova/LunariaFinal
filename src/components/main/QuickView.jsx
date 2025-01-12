import React, { useContext, useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { getProductById } from '../../services/api'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';
import { DATA } from '../../context/DataContext';
import { BASKET } from '../../context/BasketContext';
import EcommerceSwiper from './EcommerceSwiper';


function QuickView() {
  const { dataFav, handleFavs, setShowQuick, quickId, setQuickId } = useContext(DATA)
  const { addToBasket, handleSize, size, setSize, color, setColor, handleColor, updateSize, updateColor, updating, handleUpdate } = useContext(BASKET)
  const [product, setProduct] = useState(null)
  const [newColor, setNewColor] = useState(null)
  const [newSize, setNewSize] = useState(null)
  useEffect(() => {
    quickId && getProductById({ proid: quickId }).then(res => { setProduct(res) })
    setNewColor(null)
    setNewSize(null)
    console.log(updateColor)
  }, [quickId])
  function handleIfColorChanged(selectedcolor) {
    setNewColor(selectedcolor)
  }
  function handleIfSizeChanged(selectedsize) {
    setNewSize(selectedsize)
  }

  // function handleSmallUpdate(id, newColor, colorChanged, newSize, sizeChanged) {
  //   handleIfColorChanged(newColor)
  //   handleIfSizeChanged(newSize)
  //   handleUpdate(id, newColor, colorChanged, newSize, sizeChanged)
  // }
  return (
    <>
      <div
        onClick={(e) => { e.stopPropagation() }}
        className='w-[100%] md:w-[90%] py-[20px] overflow-y-auto  font-[600] relative h-[100vh]  md:h-[85vh] bg-white'>
        <IoCloseSharp
          onClick={() => { setShowQuick(false) }}
          className='absolute cursor-pointer top-[20px] right-[20px]' />
        {product ? <div className='w-full h-full flex items-center pt-[20px] flex-col bp900:flex-row justify-start gap-[50px] '>
          {/* IMAGEDIV */}
          <div className='flex w-[100%] justify-between'>
            <div className="h-[90%] w-[400px]">
              <EcommerceSwiper images={product?.images} />
            </div>
          </div>
          {/* DETAILSDIV */}
          <div className={` text-black  flex-col gap-[10px] px-[20px] w-[100%]`}>
            <p className=' font-cormorantgaramond text-[3em]'>{product?.Brands.name}</p>
            <p className='font-montserrat'>{product?.name}</p>
            <p className='font-montserrat'>{product?.price} USD</p>
            {/* COLOR */}
            <div className={`${updating ? 'hidden' : 'flex'} flex gap-[10px]`}>Color:
              {
                product?.Colors.length > 0 ? product?.Colors.map((item, i) => {
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
            {/* UPDATE COLOR DIV */}
            <div className={`${updating ? 'block' : 'hidden'}`}>
              <p>Color:{
                newColor ? newColor : product.Colors.find(item => item == updateColor)
              }</p>
              <div className='flex'>
                {
                  product?.Colors.length > 0 ? product?.Colors.map((item, i) => {
                    return <div
                      key={i}
                      className={` flex items-center justify-center w-[30px] h-[30px] border-2 rounded-full`}
                      style={{ border: `${item == color ? `1px solid ${item}` : 'none'}` }}
                    >
                      <div
                        className={`cursor-pointer h-[20px] rounded-full w-[20px] `}
                        style={{ backgroundColor: item }}
                        onClick={() => { handleIfColorChanged(item) }}
                      ></div>
                    </div>
                  }) :
                    <div className='font-thin'>There is no color options</div>
                }
              </div>
            </div>
            {/* SIZE */}
            <div className={`${updating ? 'hidden' : 'flex'} flex gap-[5px]  flex-wrap`}>
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
            {/* UPDATE SIZE DIV */}
            <div className={`${updating ? 'flex' : 'hidden'} flex gap-[5px]  flex-wrap`}>
              {
                product?.Size.map((item, i) => (
                  <div
                    onClick={() => { handleIfSizeChanged(item) }}
                    className={`
                      ${newSize ? item == newSize ? 'border-black' : 'border-gray-200'
                        : item == updateSize ? 'border-black' : 'border-gray-200'

                      }
                       px-[26px] py-[2px] border-2 cursor-pointer   transition-all duration-300`}
                    key={i}>
                    {item}
                  </div>)
                )
              }
            </div>
            <div className='flex  pt-[30px] items-center justify-between   gap-[10px] w-[100%]'>
              {/* ADD BUTTON */}
              <div
                onClick={() => {
                  if (size) {
                    addToBasket(
                      product?.id,
                      product.name,
                      product.description,
                      product.price,
                      product.discount,
                      product.Brands.name,
                      product.images,
                      size
                    );
                    toast.success('dhello xalqim')
                  }
                  else {
                    return toast.error('Select Size pls')
                  }
                }}
                className={`${updating ? 'hidden' : 'flex'} h-[45px] w-[100%] items-center  justify-center cursor-pointer transition-all text-center duration-300 border-[1px] border-black bg-black text-white hover:bg-white hover:text-black `} >
                <button
                >
                  ADD TO CARD
                </button>
              </div>
              {/* UPDATE BUTTON */}
              <div
                onClick={() => {
                  setShowQuick(false)
                  // handleSmallUpdate(product.id, newColor || updateColor, colorChanged, newSize || updateSize, sizeChanged)
                  handleUpdate(product.id, newColor || updateColor, updateColor, newSize || updateSize, updateSize)
                }}
                className={`${updating ? 'flex' : 'hidden'} font-montserrat h-[45px] w-[100%] items-center  justify-center cursor-pointer transition-all text-center duration-300 border-[1px] border-black bg-black text-white hover:bg-white hover:text-black `} >
                <button
                >
                  UPDATE
                </button>
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault()
                  handleFavs(product.id)
                }}
                className='cursor-pointer'
              >
                {
                  (dataFav && dataFav.find(itema => itema.id == product.id)) ? <VscHeartFilled className={` text-[2em]`} />
                    : <VscHeart className={` text-[2em] `} />
                }
              </div>

            </div>
            <div className='pb-[50px]'>
              <Link to={`/details/${product.name.replace(/ /g, '-')}-${quickId}`}>
                <p className='underline'>View Product page</p>
              </Link>
            </div>

          </div>
        </div>
          :
          <div className='animate-pulse w-full flex items-center pt-[20px]  md:flex-row justify-center gap-[50px] '>
            <div className='w-[300px]  h-[200px] bg-gray-500'></div>
          </div>

        }
      </div>
    </>
  )
}

export default QuickView
