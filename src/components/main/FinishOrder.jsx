import React from 'react'

function FinishOrder() {
  return (
    <>
      <div className='text-center w-[100%] h-[100vh]'>
        <p className='pt-[300px] text-[1.5em]  bp600:text-[2.5em]  lg:text-[3em]'>Thank you for your Order! #267059</p>
        <p className='bp600:text-[1.5em] bp600:w-[80%] lg:w-[40%] mx-[auto] pb-[30px]'>Your order has been accepted. You will get SMS and you operator  will contact you.</p>
        <p> <span className='underline font-montserrat'>Delivery Details</span> | <span className='underline font-montserrat'>FAQ</span></p>
      </div>
    </>
  )
}

export default FinishOrder
