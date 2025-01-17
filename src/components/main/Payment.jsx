import React, { useContext, useState } from 'react'
import { BASKET } from '../../context/BasketContext'
import { Helmet } from 'react-helmet'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Payment() {
  const { SubTotal } = useContext(BASKET)
  const [cardNumber, setCardNumber] = useState("")

  const handleInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, "")
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ")
    setCardNumber(value)
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className='w-[100%] h-[100vh] flex items-center justify-center bg-[#F7F8F2]'>
        <div className='w-[350px] scale-90 flex flex-col items-center justify-start h-[90vh] rounded bg-white'>
          <div className='  w-[90%] flex justify-center h-[40px] '>
            <img
              className="   object-cover"
              src="/img/logo.png"
              alt="Lunaria.logo"
            />
          </div>
          <div >
            <p className='flex w-[300px] border-t-2 pt-[15px] my-[20px] font-bold justify-between'>
              <span>
                Total amount:
              </span>
              <span>
                {SubTotal} USD
              </span>
            </p>
          </div>
          <div >
            <p className='text-start w-[300px] border-t-2 py-[10px]'>Name,Surname:</p>
            <input
              required
              value=''
              type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[300px]' placeholder='Ad Soyad' />

          </div>
          <div className="flex flex-col ">
            <p className='text-start w-[300px] py-[10px]'>Card number:</p>
            <input
              type="text"
              value={cardNumber}
              onChange={handleInputChange}
              maxLength="19"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none  w-[300px]"
              placeholder="xxxx xxxx xxxx xxxx"
            />
          </div>
          <div >
            <p className='text-start w-[300px] py-[10px]'>The expiration date of the card: </p>
            <div className='flex justify-between'>
              <select className='border-black border-[1px] rounded p-[5px] w-[45%]'>
                <option value=""> Choose month...</option>
                {
                  Array(12).fill('ayan').map((item, i) => {
                    return <option> {i + 1} | {months[i]}</option>
                  })
                }
              </select>
              <select className='border-black border-[1px] rounded p-[5px] w-[45%]'>
                <option value=""> Choose year...</option>
                {
                  Array(10).fill('ayan').map((item, i) => {
                    return <option> {2024 + i}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className="flex flex-col  relative">
            <p className='text-start w-[300px] py-[10px]'>cvv2 / cvc2:</p>
            <input
              type="password"
              maxLength="3"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none  w-[300px]"
              placeholder="cvv2 / cvc2"
            />
            <div className='cvvcardgroup relative cursor-pointer'>
              <AiOutlineQuestionCircle className='absolute right-[10px] text-[1.1em]   -top-[30px]' />
              <img
                className=" w-[45%]  bottom-[50px] right-0 z-50 rounded hidden cvvcard object-cover"
                src="/img/cvvcard.png"
              />
            </div>


          </div>
          <div className='flex w-[80%] justify-between my-[20px]' >
            <button className='flex items-center w-[45%] gap-[10px] hover:underline duration-300 transition-all '>
              <Link to={'/checkout'} className='flex items-center'>
                <FaArrowLeft className='text-[.7em]' /> <p>Go Back</p>
              </Link>
            </button>
            <Link 
            to={'/finishorder'}
            className={`border-[1px] flex justify-center items-center transition-all w-[45%]  bg-black text-white hover:bg-white hover:text-black duration-200 border-black h-[40px] `}>
              PAY
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Payment
