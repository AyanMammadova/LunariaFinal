import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { Link } from 'react-router-dom'

function RegisterPage() {
  const [hidePassword1, setHidePassword1] = useState(true)
  const [hidePassword2, setHidePassword2] = useState(true)

  const initialObj = {
    name: "",
    lastname: "",
    email: "",
    number: "",
    birthday: "",
    gender: "",
    password: "",
    repeatpass: "",
  }
  const [registerData, setRegisterData] = useState(initialObj)
  
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <form className='pt-[150px] '>
        <p className='text-[2em] font-serif text-center'>Sign Up</p>
        <div className=' w-[400px] text-[.8em]  mx-[auto] *:py-[5px]  p-[10px]'>
          <p className=' font-bold'>FIRST NAME</p>
          <input
            required
            value={registerData.name}
            onChange={(e) => {
              setRegisterData({ ...registerData, name: e.target.value })
            }}
            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='First Name' />

          <p className=' font-bold'>LAST NAME</p>
          <input
            required
            value={registerData.lastname}
            onChange={(e) => {
              setRegisterData({ ...registerData, lastname: e.target.value })
            }}
            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Last Name' />

          <p className=' font-bold'>EMAIL</p>
          <input
            required
            value={registerData.email}
            onChange={(e) => {
              setRegisterData({ ...registerData, email: e.target.value })
            }}
            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Email' />

          <p className=' font-bold'>MOBILE NUMBER</p>
          <input
            required
            value={registerData.number}
            onChange={(e) => {
              setRegisterData({ ...registerData, number: e.target.value })
            }}
            type="tel" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Mobile Numbers' />

          <p className=' font-bold'>BIRTHDAY</p>
          <input
            required
            value={registerData.birthday}
            onChange={(e) => {
              setRegisterData({ ...registerData, birthday: e.target.value })
            }}
            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Birthday' />

          <p className=' font-bold'>GENDER</p>
          <select
            required
            value={registerData.gender}
            onChange={(e) => {
              setRegisterData({ ...registerData, gender: e.target.value })
            }}
            className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]'>
            <option value="" hidden>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female </option>
          </select>

          <p className=' font-bold'>PASSWORD</p>
          <div className='flex border-[1px] border-gray-400 rounded p-[3px] justify-between   w-[95%]'>
            <input
              required
              type={hidePassword1 ? 'password' : 'text'}
              className='w-[100%]' placeholder='Password'
              onChange={(e) => {
                setRegisterData({ ...registerData, password: e.target.value })
              }}
            />
            <div
              className='cursor-pointer'
              onClick={() => { setHidePassword1(!hidePassword1) }}>
              {
                hidePassword1 ? <LuEyeOff /> : <LuEye />
              }

            </div>
          </div>


          <p className=' font-bold'>REPEAT PASSWORD</p>
          <div className='flex border-[1px] border-gray-400 rounded p-[3px] justify-between   w-[95%]'>
            <input
              required
              type={hidePassword2 ? 'password' : 'text'}
              className='w-[100%]' placeholder='Repeat Password'
              onChange={(e) => {
                setRegisterData({ ...registerData, repeatpass: e.target.value })
              }}
            />
            <div
              className='cursor-pointer'
              onClick={() => { setHidePassword2(!hidePassword2) }}>
              {
                hidePassword2 ? <LuEyeOff /> : <LuEye />
              }

            </div>
          </div>
          <div className='flex'>
            <input
              required
              type='checkbox' className='mb-[15px] mr-[5px]' name="" id="" />
            <p>By registering, your account will be subjected to the Terms & Conditions and Privacy Policy</p>
          </div>
          <button
            className='bg-black my-[20px] h-[40px]  text-[1.2em] rounded text-white font-serif w-[96%] hover:bg-white hover:text-black border-[1px] border-black transition-all duration-200'
            onClick={(e) => {
              e.preventDefault()
              if (registerData.name && registerData.lastname && registerData.email && registerData.birthday && registerData.number
                && registerData.password == registerData.repeatpass) {
                toast.success('Successfully toasted!')
              }
              else if (registerData.password == registerData.repeatpass) {
                toast.error('fill all the inputs dear!')
              }
              else {
                toast.error('your passwords dont match!')
              }
            }}
          >
            Register
          </button>

          <hr />
          <p className='text-center font-serif'>Already have an account?</p>
          <Link to={'/login'}>
            <button className='bg-white my-[20px] h-[40px]  text-[1.2em] rounded text-black font-serif w-[96%] hover:bg-black hover:text-white border-[1px] border-black transition-all duration-200'>
              Sign in
            </button>
          </Link>

        </div>
      </form>
    </>
  )
}

export default RegisterPage
