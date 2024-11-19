import React from 'react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

function Footer() {
  return (
    <>
      <footer className='px-[40px]'>
        <div className='flex flex-wrap gap-[20px] justify-between    py-[20px]'>
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

        </div>
        <p className='pb-[400px]'>© Copyright 2024 Lunaira.</p>
      </footer>
    </>
  )
}

export default Footer
