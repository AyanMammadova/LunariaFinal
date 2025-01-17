import React, { useContext, useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { getProductById } from '../../services/api'
import toast, { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';
import { DATA } from '../../context/DataContext';
import { BASKET } from '../../context/BasketContext';
import EcommerceSwiper from './EcommerceSwiper';
import { FaCheck } from 'react-icons/fa6';


function QuickView({ setShowBag }) {
  const { dataFav, handleFavs, setShowQuick, showQuick, quickId, setQuickId } = useContext(DATA)
  const { addToBasket, size, setSize, color, setColor, updateSize, updateColor, updating, handleUpdate, basket } = useContext(BASKET)
  const [product, setProduct] = useState(null)
  const [newColor, setNewColor] = useState(null)
  const [newSize, setNewSize] = useState(null)
  const [alreadyExist, setAlreadyExist] = useState(true)
  useEffect(() => {
    quickId && getProductById({ proid: quickId }).then(res => { setProduct(res) })
    setNewColor(null)
    setNewSize(null)
  }, [quickId, showQuick])
  useEffect(() => {
    setColor(product?.Colors[0])
    setSize(product?.Size[0])
  }, [product, showQuick])
  function handleIsAlreadyExist(id, color, size) {
    if (basket?.filter(item => item.id == id && item.color == color && item.size == size).length == 1) {
      setAlreadyExist(true)
    }
    else {
      setAlreadyExist(false)
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div
        onClick={(e) => { e.stopPropagation() }}
        className='w-[100%] md:w-[90%] py-[20px] overflow-y-auto  font-[600] relative h-[100vh]  md:h-[85vh] bg-white'>
        <IoCloseSharp
          onClick={() => { setShowQuick(false) }}
          className='absolute cursor-pointer top-[20px] right-[20px]' />
        {product ? <div className='w-full h-full flex items-center pt-[20px] flex-col bp900:flex-row justify-start gap-[50px] '>
          {/* IMAGEDIV */}
          <div className='flex w-[100%] justify-center'>
            <div className="h-[90%] w-[280px] bp400:w-[400px]  bp500:w-[450px]">
              <EcommerceSwiper images={product?.images} />
            </div>
          </div>
          {/* DETAILSDIV */}
          <div className={` text-black  flex-col gap-[10px] px-[20px] w-[100%]`}>
            <p className=' font-cormorantgaramond text-[3em]'>{product?.Brands.name}</p>
            <p className='font-montserrat'>{product?.name}</p>
            <p className='font-montserrat'>{product?.price} USD</p>
            {/* COLOR */}
            <div className={`${updating ? 'hidden' : 'flex'} py-[5px] flex gap-[10px]`}>Color:
              {
                product?.Colors.length > 0 ? product?.Colors.map((item, i) => {
                  return <div
                    key={i}
                    className={` flex items-center justify-center  cursor-pointer w-[25px] shadow-lg  h-[25px] rounded-full ${item == 'WHITE' ? `border-[1px] border-black` : ""}`}
                    style={{ backgroundColor: item }}
                    onClick={() => { setColor(item) }}
                  >
                    <FaCheck className={`${item == color ? 'block' : 'hidden'} ${item == 'BLACK' || item == 'BLUE' || item == 'PURPLE' || item == 'GREEN' ? 'text-white' : ''}`} />
                  </div>
                }) :
                  <div className='font-thin'>There is no color options</div>
              }

            </div>
            {/* UPDATE COLOR DIV */}
            <div className={`${updating ? 'block' : 'hidden'} py-[5px]`}>
              <p>Color:{
                newColor ? newColor : product.Colors.find(item => item == updateColor)
              }</p>
              <div className='flex m-[3px] gap-[3px]'>
                {
                  product?.Colors.length > 0 ? product?.Colors.map((item, i) => {
                    return <div
                      key={i}
                      className={`flex items-center justify-center  cursor-pointer w-[25px] shadow-lg  h-[25px] rounded-full ${item == 'WHITE' ? `border-[1px] border-black` : ""}`}
                      style={{ backgroundColor: item }}
                      onClick={() => {
                        setNewColor(item)
                        handleIsAlreadyExist(product.id, item, newSize || updateSize)
                      }}
                    >
                      <FaCheck className={`${newColor ? item == newColor ? 'block' : 'hidden' : item == updateColor ? 'block' : 'hidden'} ${item == 'BLACK' || item == 'BLUE' || item == 'PURPLE' || item == 'GREEN' ? 'text-white' : 'text-black'}`} />
                    </div>
                  }) :
                    <div className='font-thin'>There is no color options</div>
                }
              </div>
            </div>
            {/* SIZE */}
            <div className={`${updating ? 'hidden' : 'flex'} flex gap-[5px] py-[5px]  flex-wrap`}>
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
            {/* UPDATE SIZE DIV */}
            <div className={`${updating ? 'flex' : 'hidden'} flex gap-[5px]  py-[5px] flex-wrap`}>
              {
                product?.Size.map((item, i) => (
                  <div
                    onClick={() => {
                      setNewSize(item)
                      handleIsAlreadyExist(product.id, newColor || updateColor, item)
                    }}
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
            {/* <p className={`${alreadyExist ? 'block' : 'hidden'} py-[5px]`}>Change smth to update</p> */}
            <div className='flex  pt-[10px] items-center justify-between   gap-[10px] w-[100%]'>
              {/* ADD BUTTON */}
              <div
                onClick={() => {
                  if (size, color) {
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
                  alreadyExist ? '' : handleUpdate(product.id, newColor || updateColor, updateColor, newSize || updateSize, updateSize); setShowQuick(false)
                }}
                className={`${updating ? 'flex' : 'hidden'} ${alreadyExist ? 'bg-gray-400 text-gray-700' : ''} font-montserrat h-[45px] w-[100%] items-center  justify-center cursor-pointer transition-all text-center duration-300 border-[1px] border-black bg-black text-white hover:bg-white hover:text-black `} >
                <button
                >
                  {alreadyExist ? 'CLOSE' : 'UPDATE'}
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
              <Link to={`/details/${product.name.replace(/ /g, '-')}-${quickId}`}
                onClick={() => {
                  setShowQuick(false)
                  setShowBag(false)
                }}
              >
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
