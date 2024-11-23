import React, { useContext, useState } from 'react'
import { DATA } from '../../context/DataContext'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';



import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
function ProductSwiper() {
    const {dataDiscounted}=useContext(DATA)
    const [hover,setHover]=useState(false)
    function handleHover(status){
        const newhover=status
        setHover(newhover) 
    }
  return (
    <>
      <Swiper
            slidesPerView={ 2 }
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
                // Pause on hover
                swiper.el.addEventListener('mouseenter', () => swiper.autoplay.stop());
                swiper.el.addEventListener('mouseleave', () => swiper.autoplay.start());
              }}
            
            modules={[FreeMode, Pagination,Autoplay]}
            className="mySwiper"
          >
            {
              dataDiscounted && dataDiscounted.map((item,i)=>{
                return  <SwiperSlide key={i} > 
                            <div key={i} className='my-[20px]  shadow-lg  relative flex cursor-pointer flex-col'>
                                <img 
                                onMouseEnter={()=>{setHover(true)}}
                                onMouseLeave={()=>{setHover(false)}}
                                className='' 
                                src={item.isHover ?  item.images[1] : item.images[0]}
                                alt={item.name} />
                                <div className='bg-green-300 w-[40px] text-center rounded absolute top-0 left-0'>
                                    {item.discount}%
                                </div>
                                <div className='p-[10px]'>
                                    <p className='font-bold text-[1.1em]'>{item.Brands.name}</p>
                                    <p className='font-thin text-nowrap overflow-hidden text-ellipsis text-gray-500'>{item.name}</p>
                                    <p>
                                        <del>{item.price}$</del>
                                        {((item.price*(100-item.discount))/100).toFixed(2)}$
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
              })
            }
            
            
          </Swiper>
    </>
     
  )
}

export default ProductSwiper
