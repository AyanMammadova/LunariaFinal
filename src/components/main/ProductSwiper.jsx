  import React, { useContext, useEffect, useState } from 'react'
  import { DATA } from '../../context/DataContext'
  import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
  import { Swiper, SwiperSlide } from 'swiper/react';



  import 'swiper/css';
  import 'swiper/css/free-mode';
  import 'swiper/css/pagination';
  import { getDataByCategory } from '../../services/api';
import { Link } from 'react-router-dom';
  function ProductSwiper({type}) {
    // console.log(type)
      const [currentData,setCurrentData]=useState(null)
      const {dataDiscounted,setDataDiscounted}=useContext(DATA)
      useEffect(()=>{
        if(type=='discount') {
          setCurrentData(dataDiscounted)
        }
        else{
          getDataByCategory(type).then(res=>{setCurrentData(res.data)})
          // setCurrentData(newdd)
        }
      },[type,dataDiscounted])
      function handleHover(id,status){
        const updatedData=currentData?.map((item,i)=>{
            if(item.id==id){
              return {...item,isHover:status}
            }return item
          })
          setCurrentData(updatedData)
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
                swiper.el.addEventListener('mouseenter', () => swiper.autoplay.stop());
                swiper.el.addEventListener('mouseleave', () => swiper.autoplay.start());
              }}
            
            modules={[FreeMode, Pagination,Autoplay]}
            className="mySwiper"
          >
            {
              currentData && currentData.map((item,i)=>{
                return  <SwiperSlide key={i} > 
                            <Link to={`/productbyid/${item.id}`}>
                              <div key={i} className='my-[20px]  shadow-lg bg-white  relative flex cursor-pointer flex-col'>
                                  <div 
                                  onPointerEnter={()=>{handleHover(item.id,true)}}
                                  onPointerLeave={()=>{handleHover(item.id,false)}}
                                  className=' relative h-[100%] overflow-hidden group'>
                                    <img 
                                    className='transition-all duration-300 ease-in-out '
                                    src={item.isHover ?  item.images[1] : item.images[0]}
                                    alt={item.name} 
                                    
                                    />
                                    <div 
                                    // onClick={()=>{setShowQuickView(true)}}
                                    className={ `group-hover:bottom-0  -bottom-full transition-all duration-300 h-[30px]  text-center text-white absolute  w-[100%] bg-[rgba(19,19,19,0.7)]`}>
                                      QUICK VIEW
                                    </div>
                                  </div>
                                  <div 
                                    className={`${type=='discount' ? 'block' : 'hidden'} bg-black text-white w-[40px] text-center rounded absolute top-0 left-0`}>
                                      {item.discount}%
                                  </div>
                                  <div className='p-[10px]'>
                                      <p className='font-bold text-[1.1em] z-10'>{item.Brands.name}</p>
                                      <p className=' text-nowrap overflow-hidden font-[600] text-ellipsis text-gray-500'>{item.name}</p>
                                      <p className={`${type=='discount' ? 'block' : 'hidden'} text-green-700 py-[10px] font-bold`}>
                                          <del className='text-red-500'>{item.price}</del> 
                                          <span className='px-[10px]'>{((item.price*(100-item.discount))/100).toFixed(2)}$</span>
                                      </p>
                                      <p className={`${type=='discount' ? 'hidden' : 'block'} font-bold`}>
                                        {item.price}$
                                      </p>
                                  </div>
                              </div>
                            </Link>
                        </SwiperSlide>
              })
            }
            
            
          </Swiper>
        </>
        
      )
  }

  export default ProductSwiper
