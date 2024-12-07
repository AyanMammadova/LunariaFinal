import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Autoplay,FreeMode, Navigation, Thumbs } from 'swiper/modules';

function EcommerceSwiper({ images }) {
    console.log(images[1])
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                freeMode={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs,Autoplay]}
                className="mySwiper2"
            >
                {
                    images && images.map((item, i) => {
                        return <SwiperSlide key={i}>
                            <img className='h-[100px]' src={item} alt="" />
                        </SwiperSlide>
                    })
                }


            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >

                {
                    images && images.map((item, i) => {
                        return <SwiperSlide key={i}>
                            <img className='h-[100px]' src={item} alt="" />
                        </SwiperSlide>
                    })
                }

            </Swiper>


        </>
    )
}

export default EcommerceSwiper
