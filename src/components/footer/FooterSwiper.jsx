import React, { useContext } from 'react'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { DATA } from '../../context/DataContext';

function FooterSwiper() {
  const { imgsforfooter } = useContext(DATA)
  return (
    <>
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
            slidesPerView: 6,
            spaceBetween: 25,
          },
        }}
        freeMode={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}

        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper"
      >
        {
          imgsforfooter && imgsforfooter.map((item, i) => {
            return <SwiperSlide key={i} >
              <img className="w-full h-auto cursor-grab object-cover " src={item} alt="" />
            </SwiperSlide>
          })
        }


      </Swiper>
    </>
  )
}

export default FooterSwiper
