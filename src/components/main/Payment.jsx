import React, { useContext } from 'react'
import { BASKET } from '../../context/BasketContext'

function Payment() {
  const {SubTotal}=useContext(BASKET)
  return (
    <>
      <div className='w-[100%] h-[100vh] flex items-center justify-center bg-[#F7F8F2]'>
        <div className='w-[350px] flex flex-col items-center justify-center h-[90vh] border-2 bg-red-300'>
          <div className='border-b-2 w-[90%] flex justify-center h-[40px] '>
            <img
              className="lg:h-[30px] my-[10px]  object-cover"
              src="/img/logo.png"
              alt="Lunaria.logo"
            />
          </div>
          <div>
            <p className='flex w-[300px] bg-green-200 justify-between'>
              <span>
              Toplam məbləğ
              </span>
              <span>
                {SubTotal} USD
              </span>
            </p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Payment
