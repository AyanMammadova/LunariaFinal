import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { MdOutlineLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

function Cabinet() {
    const savedData = JSON.parse(localStorage.getItem('registerData'));
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            <Helmet>
                <title>Lunaria | Cabinet</title>
            </Helmet>
            <div className='pt-[150px]  flex justify-around w-[100%]'>

                <div className='flex flex-col bp600:flex-row w-[97%] justify-between items-center bp600:items-start bp600:w-[80%]  pt-[20px]   rounded-md'>
                    <div className=" w-[100%] relative bp600:w-[40%]  mx-[20px] flex-col items-center hidden lg:flex    ">
                        <img src="https://cdn-cloudflare.emporium.az/customer-account/main.jpg" className='hidden lg:block' />
                    </div>
                    {/* TEXT  DIV */}
                    <div>

                        <div className='w-[100%] flex justify-between items-center'>
                            <p className='font-cormorant text-[1.5em] bp500:text-[2em]'>Salam, {savedData?.name} {savedData?.lastname}</p>
                            <div
                                onClick={() => { handleLogout() }}
                                className=' flex  bp500:px-[20px] cursor-pointer'>

                                <MdOutlineLogout className='text-[1.5em]' />
                                <p className='hidden bp500:block'>Log out</p>
                            </div>
                        </div>
                        <div className='grid bp500:grid-cols-2 gap-[20px] w-[100%]'>
                            <div
                            className='w-[100%] border-gray-400 py-[25px] p-[10px] cursor-pointer  rounded-s border-[1px]'>
                                <p className='font-montserrat '>SIFARİŞLƏRİM</p>
                                <p className='font-montserrat text-[1em] text-gray-600'>Sifarişlərinizin gedişatına baxınçmübadilə və ya qaytarma təşkil edin</p>
                            </div>
                            <div className='w-[100%] border-gray-400 py-[25px] p-[10px] cursor-pointer  rounded-s border-[1px]'>
                                <p className='font-montserrat '>Ünvan Kitabçası </p>
                                <p className='font-montserrat text-[1em] text-gray-600'>Sifarişlərinizin gedişatına baxınçmübadilə və ya qaytarma təşkil edin</p>
                            </div>
                            <Link to={'/accountinfo'} className='w-[100%] border-gray-400 py-[25px] p-[10px] cursor-pointer hover:border-black rounded-s border-[1px]'>
                                <p className='font-montserrat '>Hesab Məlumatları </p>
                                <p className='font-montserrat text-[1em] text-gray-600'>Sifarişlərinizin gedişatına baxınçmübadilə və ya qaytarma təşkil edin</p>
                            </Link>
                            <div className='w-[100%] border-gray-400 p-[10px] py-[25px] cursor-pointer  rounded-s border-[1px]'>
                                <p className='font-montserrat '>Ən çox verilən suallar </p>
                                <p className='font-montserrat text-[1em] text-gray-600'>Sifarişlərinizin gedişatına baxınçmübadilə və ya qaytarma təşkil edin</p>
                            </div>
                            <div className='w-[100%] border-gray-400 py-[25px] p-[10px] cursor-pointer rounded-s border-[1px]'>
                                <p className='font-montserrat '>Əlaqə</p>
                                <p className='font-montserrat text-[1em] text-gray-600'>Sifarişlərinizin gedişatına baxınçmübadilə və ya qaytarma təşkil edin</p>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </>
    )
}

export default Cabinet
