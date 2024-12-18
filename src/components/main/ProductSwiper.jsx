import React, { useContext, useEffect, useState } from 'react'
import { DATA } from '../../context/DataContext'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { getDataByCategory, getDataBySubCategory } from '../../services/api';
import { Link } from 'react-router-dom';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';
function ProductSwiper({ type, validId, setShowQuick, setproid }) {

  const { dataDiscounted, handleFavs, dataFav } = useContext(DATA)

  const [currentData, setCurrentData] = useState(null)
  console.log(currentData)
  useEffect(() => {
    if (type == 'discount') {
      setCurrentData(dataDiscounted)
    }
    else if (type == 'category') {
      getDataByCategory(validId).then(res => { setCurrentData(res.data) })
    }
    else if (type == 'subcategory') {
      getDataBySubCategory(validId).then(res => { setCurrentData(res.data) })
    }
  }, [type, dataDiscounted, validId])


  return (
    <>
      <div className='relative w-[100%] flex flex-col h-[100%]'>
        {
          currentData?.length > 1 ? <div className='flex '>
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              breakpoints={{
                400: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 25,
                },
              }}
              freeMode={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              onSwiper={(swiper) => {
                swiper.el.addEventListener('mouseenter', () => swiper.autoplay.stop());
                swiper.el.addEventListener('mouseleave', () => swiper.autoplay.start());
              }}

              modules={[FreeMode, Pagination, Autoplay]}
              className="mySwiper z-30"
            >
              {
                currentData.map((item, i) => {
                  return <SwiperSlide key={i} className=''>
                    <Link to={`/productbyid/${item.id}`}>
                      <div key={i} className='my-[20px]  shadow-lg bg-white  relative flex cursor-pointer flex-col'>
                        <div
                          className=' relative h-[100%] overflow-hidden group '>
                          <img
                            className={`group-hover:hidden transition-opacity duration-300 ease-in-out `}
                            src={item.images[0]} alt=""
                          />
                          <img
                            className={`hidden group-hover:block transition-opacity duration-300 ease-in-out`}
                            src={item.images[1]} alt=""
                          />
                          <div
                            onClick={(e) => {
                              e.preventDefault()
                              handleFavs(item.id)
                            }}

                          >
                            {
                              (dataFav && dataFav.find(itema => itema.id == item.id)) ? <VscHeartFilled className={`absolute text-[2em] top-[10px] right-[10px]`} />
                                : <VscHeart className={`absolute text-[2em] top-[10px] right-[10px] `} />
                            }



                          </div>

                          <div className={`${type == 'discount' ? 'hidden' : 'block'}`}>
                            <div
                              onClick={(e) => {
                                setShowQuick(true)
                                setproid(item.id)
                                e.preventDefault()
                              }}
                              className={` group-hover:bottom-0  -bottom-full transition-all duration-300 h-[30px]  text-center text-white absolute  w-[100%] bg-[rgba(19,19,19,0.7)]`}>
                              QUICK VIEW
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${item.discount > 1 ? 'block' : 'hidden'} bg-black text-white w-[40px] text-center rounded absolute top-0 left-0`}>
                          {item.discount}%
                        </div>
                        <div className='p-[10px]'>
                          <p className='font-bold text-[1.1em] z-10'>{item.Brands.name}</p>
                          <p className=' text-nowrap overflow-hidden font-[600] text-ellipsis text-gray-500'>{item.name}</p>
                          <p className={`${item.discount > 1 ? 'block' : 'hidden'} text-green-700  font-bold`}>
                            <del className='text-red-500'>{item.price}</del>
                            <span className='px-[10px]'>{((item.price * (100 - item.discount)) / 100).toFixed(2)}$</span>
                          </p>
                          <p className={`${item.discount > 2 ? 'hidden' : 'block'} font-bold`}>
                            {item.price}$
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                })
              }


            </Swiper>
          </div> : <div className='flex overflow-hidden gap-[10px]'>
            {Array(3).fill('sdjb').map((_, i) => {
              return  <div key={i} className='my-[20px] p-[20px]  h-[300px] w-[300px] border-2 items-center  gap-[20px] shadow-lg bg-white  relative flex cursor-pointer flex-col'>
                  <div className='bg-gray-400 h-[70%] w-[90%] animate-pulse'></div>
                  <div className='bg-gray-400 h-[10%] w-[90%] animate-pulse'></div>
                  <div className='bg-gray-400 h-[10%] w-[90%] animate-pulse'></div>
                </div>
            })}
          </div>


          // (
          //   <div>
          //     <p className='text-center pt-[30px] font-montserrat text-[1.3em] bp600:text-[2em]'>
          //       We're sorry, there are no products available in this category right now. Please check back later!
          //     </p>
          //   </div>)
        }
      </div>

    </>

  )
}

export default ProductSwiper
