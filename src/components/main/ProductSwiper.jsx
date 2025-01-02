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
      <div className={`${type == 'category' ? 'md:w-[80%] w-[100%]' : ''} w-[100%] relative  flex flex-col `}>
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
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
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
                    <Link to={`/details/${item.name.replace(/ /g, '-')}-${item.id}`}>
                      <div key={i} className='my-[20px]  shadow-sm bg-white  relative flex cursor-pointer flex-col'>
                        <div
                          className=' relative overflow-hidden group '>
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
                              className={` group-hover:bottom-0  -bottom-full transition-all duration-300 h-[30px]   text-white absolute  w-[100%] bg-[rgba(19,19,19,0.7)]`}>
                              QUICK VIEW
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${item.discount > 1 ? 'block' : 'hidden'} bg-black text-white w-[40px]  rounded absolute top-0 left-0`}>
                          {item.discount}%
                        </div>
                        <div className='p-[10px] text-start'>
                          <p className='font-bold text-[1.1em] z-10'>{item.Brands.name}</p>
                          <p className=' text-nowrap overflow-hidden font-[600] text-ellipsis text-gray-500'>{item.name}</p>
                          <p className={`${item.discount > 1 ? 'block' : 'hidden'} text-black text-[1.2em]`}>
                            <span>{((item.price * (100 - item.discount)) / 100).toFixed(1)}$</span>
                            <del className='text-gray-600 px-[10px] text-[.8em]'>{item.price}</del>
                          </p>
                          <p className={`${item.discount > 1 ? 'hidden' : 'block'} font-bold`}>
                            {item.price}$
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                })
              }


            </Swiper>
          </div> : <div>
            <p className='text-center pt-[30px] font-montserrat text-[1.3em] bp600:text-[2em]'>
              We're sorry, there are no products available in this category right now. Please check back later!
            </p>
          </div>
        }
      </div>

    </>

  )
}

export default ProductSwiper