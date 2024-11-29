import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DATA } from '../../context/DataContext'
import ProductSwiper from './ProductSwiper'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import QuickView from './QuickView'

function ByCategory() {
  const {catname,catid}=useParams()
  const {imgsfordeps,imgsforsubcats,dataCategory}=useContext(DATA)
  // console.log(imgsforsubcats[catid-1])
  const [showQuick,setShowQuick]=useState(false)
  const [proid,setproid]=useState(null)
  
  return (
    <>
      <section>
        <div className={`${showQuick ? 'block' : 'hidden'} w-[100vw] bg-[#53525280] flex justify-center items-center  fixed h-[100vh] z-50`}>
          <QuickView setShowQuick={setShowQuick} proid={proid}/>
        </div>
        <div className='overflow-hidden h-[100vh]  w-[95%] mx-[auto] relative group'>
          <div className='h-full absolute  w-full  m-[auto] bg-[#35313180] z-10' ></div>
          <img  className=' absolute  top-0 object-top lg:w-full object-cover h-full  transition-all duration-500 group-hover:scale-110' 
                src={imgsfordeps[catid-1]} alt="MainPhoto" />
                <p className='absolute text-[3em] font-serif left-[60px] text-white bottom-[100px]'>{catname}</p>
                <p className='absolute text-[1em] font-serif left-[65px] text-white bottom-[80px]'>New Collection</p>
          <div className='absolute z-20 bottom-[60px] w-[100%] flex-col bp600:flex-row justify-center flex gap-[20px] text-white bp600:w-[40%] bp600:left-[30%]'>
          </div>
        </div>
      </section>
      <section>
        <div className='p-[10px] bp600:p-[40px]'>
          <p className='font-[600] text-[1.2em]'>{catname}</p>
          <ProductSwiper type={'category'} validId={catid} setproid={setproid} setShowQuick={setShowQuick}/>
        </div>
      </section>
      <section>
        <div className='p-[40px]'>
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
              }
            }}
            freeMode={true}
            autoplay={{
              delay: 3000, 
              disableOnInteraction: false, 
            }}
            
            modules={[FreeMode, Pagination,Autoplay]}
            className="mySwiper"
          >
            {
              imgsforsubcats && imgsforsubcats[catid-1].map((item,i)=>{
                return  <SwiperSlide key={i} > 
                          <div className='w-full h-auto relative group overflow-hidden'>
                            <div className='h-full absolute  w-full  m-[auto] bg-[#35313180] z-10' ></div>
                            <Link to={`/productsbysubcategory/${dataCategory && dataCategory[catid-1].Subcategory[i].name}/${dataCategory && dataCategory[catid-1].Subcategory[i].id}`}
                            className='z-50 flex justify-center items-center text-white font-serif text-[1.3em] absolute inset-0'>
                              {dataCategory && dataCategory[catid-1].Subcategory[i].name}
                            </Link>
                            <img className=" w-full z-30 h-auto cursor-grab object-cover transition-all duration-300 group-hover:scale-110" src={item} alt="" />
                          </div>
                        </SwiperSlide>
              })
            }   
          </Swiper>
        </div>
        
      </section>
    </>
  )
}

export default ByCategory
