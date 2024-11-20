import React, { useContext } from 'react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { DATA } from '../../context/DataContext';


function Footer() {
  const {imgsforfooter}=useContext(DATA)
  const date=new Date
  return (
    <>
      <footer className='p-[40px] bg-white'>
        <section>
          <p className='text-[1.1em] py-[20px]'>@LUNARIABAKU</p>
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
                slidesPerView: 6,
                spaceBetween: 25,
              },
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
              imgsforfooter && imgsforfooter.map((item,i)=>{
                return  <SwiperSlide key={i} > 
                         <img className="w-full h-auto cursor-pointer object-cover " src={item} alt="" />
                        </SwiperSlide>
              })
            }
            
            
          </Swiper>
        </section>
        <section>
          <div className='bg-[#F7F7F2] text-center my-[30px] py-[30px]'>
            <p className='text-[3em] font-serif'>Join our newsletter</p>
            <p className='text-[1.5em] font-serif w-[40%] mx-auto'>By signing up to Lunaria, you’ll be the first to hear about special offers, our new arrivals, new brands and fashion trends.</p>
            <div className='py-[20px] '>
              <input className='rounded mx-[10px] border-2 border-gray-300 bg-white text-black font-serif text-[1.2em] h-[40px] px-[20px]' type="text" name="" id="" placeholder='Enter your email address' />
              <button className='rounded bg-black text-white text-[1.2em] h-[40px] px-[20px]'>SUBSCRIBE</button>
            </div>
          </div>
        </section>
        <section className='flex flex-wrap gap-[20px] justify-between    py-[20px]'>
          <div>
            <p className='text-[1.4em]'>Emporium</p>
            <p className='text-[1.2em]'>About us</p>
            <p  className='text-[1.2em]'>Store Information</p>
          </div>

          <div>
            <p className="text-[1.4em]">Customer Service</p>
            <p className="text-[1.2em]">Gift Cards</p>
            <p className="text-[1.2em]">Loyalty Program</p>
            <p className="text-[1.2em]">FAQ</p>
            <p className="text-[1.2em]">Contact Us</p>
          </div>

          <div>
            <p className="text-[1.4em]">Online Shopping</p>
            <p className="text-[1.2em]">Delivery Terms</p>
            <p className="text-[1.2em]">Return and Exchange</p>
            <p className="text-[1.2em]">Payment Methods</p>
          </div>

          <div>
            <p className="text-[1.4em]">Store Contact</p>
            <p className="text-[1.2em]">+994 51 225 96 96</p>
            <p className="text-[1.2em]">51, 153 Neftchiler Avenue</p>
          </div>
          <div>
            <p>LUNARIUN ACCEPTS</p>
           <img src="/img/visacards.png" alt="" />
           <p>SOCIAL MEDIA</p>
           <div className='flex text-[2em] justify-between'>
              <FaFacebookF className='border-2 border-black h-[40px] w-[40px] rounded-full p-[5px]'/>
              <FaInstagram className='border-2 border-black h-[40px] w-[40px] rounded-full p-[5px]'/>
              <FaWhatsapp className='border-2 border-black h-[40px] w-[40px] rounded-full p-[5px]'  />
           </div>
          </div>

        </section>
        <p className='pb-[400px] text-center'>© Copyright {date.getFullYear() } Lunaira.</p>
      </footer>
    </>
  )
}

export default Footer
