import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { Link } from 'react-router-dom'

function LoginPopUp() {
  const [hidePassword, setHidePassword] = useState(false)
  const [loginData,setLoginData]=useState({
    name:'',
    password: ''
  })
  // console.log(loginData)
  return (
    <>
    
      <div className='px-[20px] p-[10px] *:py-[4px] rounded  bg-white text-[.6em] border-[1px] border-gray-300'>
        <p className='font-serif'>My Profile</p>
        <hr />
        <input 
          type="text" 
          className='h-[30px] w-[95%] mx-[2%] border-[1px] border-gray-300 text-gray-600 font-serif px-[4px]' 
          placeholder='Username' 
          onChange={(e)=>{
            setLoginData({...loginData,name:e.target.value})
          }}
        />

        <div className='border-[1px] h-[30px] my-[10px] p-[4px] m-[2%] w-[95%] border-gray-600 flex justify-between items-center'>
          <input 
            type={hidePassword ? 'password' : 'text'} 
            className=' w-[90%]  text-gray-300 font-serif px-[4px]' 
            placeholder='Password' 
            onChange={(e)=>{
              setLoginData({...loginData,password:e.target.value})
            }}
          />

          <div
            className='cursor-pointer'
            onClick={() => { setHidePassword(!hidePassword) }}>
            {
              hidePassword ? <LuEyeOff /> : <LuEye />
            }

          </div>
        </div>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        <button 
        onClick={()=>{
          if(loginData.password.trim() && loginData.name.trim() ){
            toast.success('Successfully Signed in!')
          }
          else{
            toast.error('fill them all pls!')
          }
        }}
        className='bg-black h-[40px] mx-[5%] rounded text-white font-serif w-[90%]'>
          
          Sign in
        </button>
        <Link to={'/remind'}>
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
