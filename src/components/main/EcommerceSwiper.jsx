import React, {  useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

function EcommerceSwiper({ images }) {
    const [desktopThumbsSwiper, setDesktopThumbsSwiper] = useState(null);
    const [mobileThumbsSwiper, setMobileThumbsSwiper] = useState(null);
    const [activeIndexMobile, setActiveIndexMobile] = useState(0)
    const [activeIndexDesktop, setActiveIndexDesktop] = useState(0)
    return (
        <>
            <div className='hidden bp500:flex flex-row max-w-[100%] justify-between '>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: desktopThumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2desktop "
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
                    onSwiper={setDesktopThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    direction='vertical'
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper1desktop "
                >
                    {
                        images && images.map((item, i) => {
                            return <SwiperSlide className='w-[100%]' key={i}>
                            <div className='relative h-[100%] w-[100%]'>
                                <img className={` object-cover h-[100%] w-[90px] ${activeIndexDesktop==i ? 'border-[1px] border-gray-500 rounded' : 'border-none'}  `} src={item} />
                                <div 
                                onClick={()=>setActiveIndexDesktop(i)}
                                className={`${activeIndexDesktop==i ? 'hidden ' : 'absolute'} top-0  bg-gray-200/40 h-[100%] w-[100%]`}></div>
                            </div> 
                        </SwiperSlide > 
                        })
                    }

                </Swiper>
            </div>
            <div className='bp500:hidden mx-[auto]  max-w-[400px] gap-[10px] flex flex-col bp500:flex-row'>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: mobileThumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2 w-[100%] bp500:hidden"
                >
                    {
                        images && images.map((item, i) => {
                            return <SwiperSlide className='w-[100%]' key={i}>
                                <img className='object-cover h-[100%] w-[100%]  ' src={item} />
                            </SwiperSlide>
                        })
                    }



                </Swiper>
                <Swiper
                    onSwiper={setMobileThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper  max-w-[90%]  bp500:hidden"
                >
                    {
                        images && images.map((item, i) => {
                            return <SwiperSlide className='w-[100%]' key={i}>
                                <div className='relative h-[100%] w-[100%]'>
                                    <img className={`${activeIndexMobile==i ? 'border-[1px] border-gray-500 rounded' : 'border-none'}  object-cover h-[100%] w-[100%]  `} src={item} />
                                    <div 
                                    onClick={()=>setActiveIndexMobile(i)}
                                    className={`${activeIndexMobile==i ? 'hidden' : 'absolute'} top-0  bg-gray-200/50 h-[100%] w-[100%]`}></div>
                                </div> 
                            </SwiperSlide > 
                        })
                    }    


                </Swiper>
            </div>
        </>
    );
}
export default EcommerceSwiper;