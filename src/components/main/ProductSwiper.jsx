  import React, { useContext, useEffect, useState } from 'react'
  import { DATA } from '../../context/DataContext'
  import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
  import { Swiper, SwiperSlide } from 'swiper/react';
  import 'swiper/css';
  import 'swiper/css/free-mode';
  import 'swiper/css/pagination';
  import { getDataByCategory, getDataBySubCategory } from '../../services/api';
  import { Link } from 'react-router-dom';
import { BsArrowThroughHeart, BsArrowThroughHeartFill, BsBalloonHeart } from 'react-icons/bs';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';
  function ProductSwiper({type,validId,setShowQuick,setproid}) {
    
      const [currentData,setCurrentData]=useState(null)
      const {dataDiscounted,handleFavorites}=useContext(DATA)
        
      useEffect(()=>{
        if(type=='discount') {
          setCurrentData(dataDiscounted)
        }
        else if(type=='category'){
          getDataByCategory(validId).then(res=>{setCurrentData(res.data)})
        }
        else if(type=='subcategory'){
          getDataBySubCategory(validId).then(res=>{setCurrentData(res.data)})
        }
      },[type,dataDiscounted,validId])

      // currentData ?  console.log(currentData[2]?.isFav) : console.log('skdhcb sk')
      
      return (
        <>
          <div className='relative w-[100%] flex flex-col h-[100%]'>
            <div className='flex '>
              <div className={`${type=='category' ? 'block' : 'hidden'} flex flex-col mx-[20px] gap-[20px] text-center pt-[80px] w-[300px]`}>
                <p>NEW ARRIVALS</p>
                <p>{currentData?.length}</p>
                <button className='text-white border-[1px] border-black bg-black p-[10px] hover:bg-white  hover:text-black transition-all duration-300'>SHOP NOW</button>
              </div>
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
                    return  <SwiperSlide key={i} className=''> 
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
                                        {}
                                        <div  
                                          onClick={(e)=>{
                                            e.preventDefault() 
                                            handleFavorites(item.id)
                                          }}
                                        >
                                            <VscHeartFilled 
                                          className={`${item.isFav ? 'absolute' : 'hidden'} text-[2em] top-[10px] right-[10px]`}
                                        />
                                        <VscHeart  
                                          
                                          className={` text-[2em] top-[10px] right-[10px] ${item.isFav ? 'hidden' : 'absolute'}`}
                                        />
                                          
                                        </div>
                                        
                                        <div className={`${type=='discount' ? 'hidden' : 'block'}`}>
                                          <div 
                                          onClick={(e)=>{
                                            setShowQuick(true)
                                            setproid(item.id)
                                            e.preventDefault()
                                          }}
                                          className={ ` group-hover:bottom-0  -bottom-full transition-all duration-300 h-[30px]  text-center text-white absolute  w-[100%] bg-[rgba(19,19,19,0.7)]`}>
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
                                              <span className='px-[10px]'>{((item.price*(100-item.discount))/100).toFixed(2)}$</span>
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
            </div>
            </div>
          
        </>
        
      )
  }

  export default ProductSwiper
