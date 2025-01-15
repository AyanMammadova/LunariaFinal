import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

function EcommerceSwiper({ images }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <div className='flex flex-row justify-center w-[100%] '>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    {
                        images && images.map((item, i) => {
                            return <SwiperSlide key={i}>
                                <img className='h-full  object-cover' src={item} />
                            </SwiperSlide>
                        })
                    }



                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    direction='vertical'
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper1"
                >
                    {
                        images && images.map((item, i) => {
                            return <SwiperSlide key={i}>
                                <img src={item} />
                            </SwiperSlide>
                        })
                    }

                </Swiper>
            </div>
        </>
    );
}
export default EcommerceSwiper;