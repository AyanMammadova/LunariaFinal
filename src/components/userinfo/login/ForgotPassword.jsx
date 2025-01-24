import React from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  return (
    <>
      <div className='pt-[150px] max-w-[300px] mx-[auto]'>
        <p className='text-center font-serif  text-[2em] pb-[20px]'>Remind Password</p>
        <p className='uppercase font-[600]'>email</p>
        <div className='w-[100%] my-[10px] border-[1px] border-gray-400 flex'>
            <input type="text" className=' w-[100%] border-2 border-white' placeholder='ayan@1234'/>
        </div>
        <button className='w-[100%] bg-black py-[4px] text-white font-[600] transition-all duration-200 hover:bg-white hover:text-black border-[1px] border-black'>Send</button>
        <Link to={'/login'}>
            <p className=' underline '>Back to sign in</p>
        </Link>
      </div>

    </>
  )
}

export default ForgotPassword
