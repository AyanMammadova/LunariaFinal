import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DATA } from '../../context/DataContext'
import ProductSwiper from './ProductSwiper'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Helmet } from 'react-helmet'
import { getDataByCategory } from '../../services/api'

function ByCategory() {
  const { catname } = useParams()
  const [cdata, setcdata] = useState(null)
  const { imgsfordeps, imgsforsubcats, dataCategory, setShowQuick, setQuickId } = useContext(DATA)
  const catid=dataCategory?.find((item, i) => item.name == catname).id
  useEffect(() => {
    getDataByCategory(catid).then(res => { setcdata(res.data) })
  }, [catname])
  return (
    <>
      <Helmet>
        <title>Lunaria |{catname} </title>
      </Helmet>
      <section>
        <div className='overflow-hidden h-[100vh]  w-[95%] mx-[auto] relative group'>

          <div className='h-full absolute  w-full  m-[auto] bg-[#35313180] z-10' ></div>

          <img className=' absolute pt-[100px] top-0 object-top lg:w-full object-cover h-full  transition-all duration-500 group-hover:scale-110'
            src={imgsfordeps[catid - 1]} alt="MainPhoto" />
          <p className='absolute text-[3em] font-serif left-[60px] text-white bottom-[100px] z-10'>{catname}</p>
          <p className='absolute text-[1em] font-serif left-[65px] z-10 text-white bottom-[80px]'>New Collection</p>
          <div className='absolute z-20 bottom-[60px] w-[100%] flex-col bp600:flex-row justify-center flex gap-[20px] text-white bp600:w-[40%] bp600:left-[30%]'>

          </div>
        </div>
      </section>
      <section>
        <div className='p-[10px] md:px-[40px]'>
          <p className='font-[600] text-[2em] font-cormorant'>{catname}</p>
          <div className={`flex flex-col md:flex-row w-[100%] gap-[20px]`}>
            <div className={`justify-center items-center flex-col gap-[5px] w-full md:w-[200px] md:h-[300px] flex  `}>
              <p className='font-montserrat text-[1.2em]'>NEW ARRIVALS</p>
              <p className='text-[4em] font-cormorant'>{cdata?.length}</p>
              <Link to={`/products/${catname}/Clothing`}>
                <button
                  className='text-white hidden md:block bg-black hover:text-black border-black border-[1px] hover:bg-white transition-all duration-200 p-[10px]'
                >
                  SHOP NOW
                </button>
              </Link>
            </div>
            <ProductSwiper type={'category'} validId={catid} setQuickId={setQuickId} setShowQuick={setShowQuick} />
          </div>
        </div>
      </section>
      <section>
        <div className='p-[10px] bp600:p-[40px]'>
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
              }
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
              imgsforsubcats && imgsforsubcats[catid - 1]?.map((item, i) => {
                return <SwiperSlide key={i} >
                  <div className='w-full h-auto relative group overflow-hidden'>
                    <div className='h-full absolute  w-full  m-[auto] bg-[#35313180] z-10' ></div>
                    <Link to={`/products/${catname}/${dataCategory?.[catid - 1].Subcategory[i].name}`}
                      className='z-50 flex justify-center items-center text-white font-serif text-[1.3em] absolute inset-0'>
                      {dataCategory && dataCategory[catid - 1].Subcategory[i].name}
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
