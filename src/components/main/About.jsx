import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
function About() {
    return (
        <>
            <div className='pt-[150px]'>
                <p className='text-center text-[2.8em] font-cormorant'>About Emporium</p>
                <p className='text-center font-montserrat  p-[10px] mx-auto bp600:w-[60%]'>
                Emporium is a multi-brand luxury concept store established in 2005. This main fashion destination situated in the very center of Baku City in the luxury shopping venue Port Baku Mall presents niche and high-class men and women’s fashion apparel, sought beauty products and fragrances, fine jewelry, and revered designer home items.
            </p>
        </div >
            <div className='flex justify-between p-[10px] bp600:p-[50px]'>
                <img src="https://www.emporium.az/assets/images/about/image_with_text.jpg" alt="" />
                <div className='flex items-center font-montserrat text-gray-800 text-[13px] font-[400] p-[10px] bp600:px-[60px]'>
                    <p>
                        The concept store presents a three-floor unique and impressive creative vision, much to the recognition of the fashion world. Emporium feels proud to host and build strong friendly relationships with more than 500 global brands and designers of such as Bottega Veneta, Fendi, Miu Miu, Balenciaga, Givenchy, etc. Emporium is part of Sinteks Group of Companies, one of the largest and most successful fashion retailers in the Caucasus region, represented in over 50 stores.
                    </p>
                </div>
            </div>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src="https://www.emporium.az/assets/images/about/carousel-2.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://www.emporium.az/assets/images/about/carousel-3.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://www.emporium.az/assets/images/about/carousel-4.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://www.emporium.az/assets/images/about/carousel-5.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="" alt="" /></SwiperSlide>

            </Swiper>
        </>
    )
}

export default About
