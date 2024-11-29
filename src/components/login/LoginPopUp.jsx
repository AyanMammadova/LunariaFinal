import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { Link } from 'react-router-dom'

function LoginPopUp() {
  const [hidePassword, setHidePassword] = useState(false)
  const [username,setuserName]=useState('')
  function handleName(val){
    console.log(val)
  }
  return (
    <>
      <div className='px-[20px] p-[10px] *:py-[4px] rounded  bg-white text-[.6em] border-[1px] border-gray-300'>
        <p className='font-serif'>My Profile</p>
        <hr />
        <input 
          type="text" 
          className='h-[30px] w-[95%] mx-[2%] border-[1px] border-gray-300 text-gray-300 font-serif px-[4px]' 
          placeholder='Username' 
          onChange={(e)=>{handleName(e.target.value)}}
        />

        <div className='border-[1px] h-[30px] my-[10px] p-[4px] m-[2%] w-[95%] border-gray-300 flex justify-between items-center'>
          <input 
            type={hidePassword ? 'password' : 'text'} 
            className=' w-[90%]  text-gray-300 font-serif px-[4px]' 
            placeholder='Password' 
          />

          <div
            className='cursor-pointer'
            onClick={() => { setHidePassword(!hidePassword) }}>
            {
              hidePassword ? <LuEyeOff /> : <LuEye />
            }

          </div>
        </div>
        <button className='bg-black h-[40px] mx-[5%] rounded text-white font-serif w-[90%]'>Sign in</button>
        <Link>
          <p className='text-black text-[.7em] underline m-[5%]'>Forgot Password</p>
        </Link>
        <hr />
        <div className='flex justify-center  gap-[5px] text-[0.8em]'>
          <p>Don't have an account?  </p>
          <Link to={'/register'}>
            <p className='underline '>Register</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default LoginPopUp
