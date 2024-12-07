import React, { useState } from 'react'
import { MdCircle } from 'react-icons/md';

function CheckOut() {
    const [delivery, setDelivery] = useState(true)
    const [standart, setStandart] = useState(true)
    const [urgent, setUrgent] = useState(false)

    const [pickup, setPickup] = useState(false)
    return (
        <>
            <p className='font-cormorant pt-[190px] text-[1.3em] text-center'>Secure Checkout</p>
            <div className='w-[100%] px-[10px] bp600:px-[80px] flex justify-between items-center'>
                <div className='rounded-full border-[1px] border-gray-900 h-[40px] font-montserrat w-[40px] flex justify-center items-center'>1</div>
                <div className='w-[37%] border-t-[1px] border-gray-300'></div>
                <div className='rounded-full border-[1px] border-gray-300 h-[40px] font-montserrat w-[40px] flex justify-center items-center'>2</div>
                <div className='w-[37%] border-t-[1px] border-gray-300'></div>
                <div className='rounded-full border-[1px] border-gray-300 h-[40px] font-montserrat w-[40px] flex justify-center items-center'>3</div>
            </div>
            <div className='w-[100%] font-montserrat px-[10px] bp600:px-[60px] flex justify-between'>
                <p>Delivery</p>
                <p>Review&Pay</p>
                <p>Complete</p>
            </div>
            <div className='p-[10px] bp400:p-[40px] font-montserrat'>
                <p className='font-cormorant text-[1.3em] py-[20px]'>Select delivery method</p>
                <div className=' flex gap-[10px]'>
                    <button onClick={() => { setDelivery(!delivery); setPickup(!pickup) }}
                        className={`border-[1px] transition-all duration-200 rounded border-black h-[50px] px-[10px] ${delivery ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >Delivery
                    </button>
                    <button onClick={() => { setPickup(!pickup); setDelivery(!delivery) }}
                        className={`border-[1px] transition-all duration-200 rounded border-black h-[50px] px-[5px] ${pickup ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >Pickup From the Store
                    </button>
                </div>
            </div>
            {/* DELİVERY DİV */}
            <div className={`${delivery ? 'block' : 'hidden'} p-[10px] bp600:p-[40px] font-montserrat`}>

                <div
                    onClick={() => { setStandart(!standart); setUrgent(!urgent) }}
                    className='flex w-[100%] justify-between items-start cursor-pointer'>
                    <div className='flex items-start gap-[20px]'>
                        <div

                            className='p-[2px] border-[1px] text-[.8em] border-black  flex items-center justify-center rounded-full'>
                            <MdCircle className={`${standart ? 'text-black' : 'text-white'}`} />
                        </div>
                        <div>
                            <p className='uppercase'>Standart Delivery</p>
                            <p className='text-gray-500'>Orders before 16:00 will be delivered on the same day. <br />After 16:00 will be delivered on next day.</p>
                        </div>
                    </div>
                    <div>
                        FREE
                    </div>
                </div>
                <div
                    onClick={() => { setStandart(!standart); setUrgent(!urgent) }}
                    className='flex w-[100%] pt-[20px] justify-between items-start cursor-pointer'>
                    <div className='flex items-start gap-[20px]'>
                        <div

                            className='p-[2px] border-[1px] text-[.8em] border-black text-black flex items-center justify-center rounded-full'>
                            <MdCircle className={`${urgent ? 'text-black' : 'text-white'}`} />
                        </div>
                        <div>
                            <p className='uppercase'>Urgent Delivery</p>
                            <p className='text-gray-500'>Order will now be and sent you </p>
                        </div>
                    </div>
                    <div>
                        15 $
                    </div>
                </div>

            </div>
            {/* PİCKUP DİV */}
            <div className={`${pickup ? 'block' : 'hidden'} p-[10px] bp600:p-[40px] font-montserrat`}>
                <p className='uppercase text-[1.2em]'>Collection point</p>
                <div className='border-[1px] border-gray-300'>
                    <iframe
                        className='w-[100%] h-[300px] rounded'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.629058470098!2d49.80693117514747!3d40.37274865831632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030634e4ec45f67%3A0xa1628495e445ab6a!2sDiv%20Academy!5e0!3m2!1sen!2saz!4v1733600111389!5m2!1sen!2saz"
                        loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    <p className='font-cormorant font-bold text-[1.3em] p-[10px] bp600:p-[40px]'>Lunaria Port Baku</p>
                    <div className='flex gap-[20px] bp600:flex-row flex-col text-[.9em] p-[10px] bp600:px-[40px] pb-[20px]'>
                        <div>
                            <p className='font-monserrat'>Store address</p>
                            <p className='font-monserrat bp600:w-[250px] text-gray-500'>153 Neftcilar Ave, AZ1001, Baku, Azerbaijan</p>
                        </div>
                        <div>
                            <p className='font-monserrat'>Opening hours</p>
                            <p className='font-monserrat text-gray-500'>Monday-Sunday: 10am-10pm</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut
