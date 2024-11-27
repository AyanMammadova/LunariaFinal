import React from 'react'
import { LuEyeOff } from 'react-icons/lu'
import { MdOutlineRemoveRedEye } from 'react-icons/md'

function RegisterPage() {
  return (
    <>
      <div className='pt-[150px] '>
        <p className='text-[2em] font-serif text-center'>Sign Up</p>
        <div className=' w-[400px] text-[.8em]  mx-[auto] *:py-[5px]  p-[10px]'>
            <p className=' font-bold'>FIRST NAME</p>
            <input type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='First Name' />

            <p className=' font-bold'>LAST NAME</p>
            <input type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Last Name' />

            <p className=' font-bold'>EMAIL</p>
            <input type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Email' />

            <p className=' font-bold'>MOBILE NUMBERS</p>
            <input type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Mobile Numbers' />

            <p className=' font-bold'>BIRTHDAY</p>
            <input type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Birthday' />

            <p className=' font-bold'>GENDER</p>
            <select  className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]'>
                <option value="" hidden>Select Gender</option>
                <option value="">Male</option>
                <option value="">Female </option>
            </select>

            <p className=' font-bold'>PASSWORD</p>
            <div className='flex border-[1px] border-gray-400 rounded p-[3px] justify-between   w-[95%]'>
                <input type="text" className='' placeholder='Password' />
                <MdOutlineRemoveRedEye  className='text-[1.4em]'/>
                <LuEyeOff className='hidden'/>
            </div>
            

            <p className=' font-bold'>REPEAT PASSWORD</p>
            <div className='flex border-[1px] border-gray-400 rounded p-[3px] justify-between   w-[95%]'>
                <input type="text" className='' placeholder='Repeat Password'/>
                <MdOutlineRemoveRedEye  className='text-[1.4em]'/>
                <LuEyeOff className='hidden'/>
            </div>
            <div className='flex'>
                <input type='checkbox' className='mb-[15px] mr-[5px]' name="" id="" /> 
                <p>By registering, your account will be subjected to the Terms & Conditions and Privacy Policy</p>
            </div>
            <button className='bg-black my-[20px] h-[40px]  text-[1.2em] rounded text-white font-serif w-[96%] hover:bg-white hover:text-black border-[1px] border-black transition-all duration-200'>Register</button>
            <hr />
            <p className='text-center font-serif'>Already have an account?</p>
            <button 
            className='bg-white my-[20px] h-[40px]  text-[1.2em] rounded text-black font-serif w-[96%] hover:bg-black hover:text-white border-[1px] border-black transition-all duration-200'>
                Sign in
            </button>
            
        </div>
      </div>
    </>
  )
}

export default RegisterPage
