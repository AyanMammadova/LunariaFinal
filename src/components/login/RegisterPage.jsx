import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [hidePassword1, setHidePassword1] = useState(true)
  const [hidePassword2, setHidePassword2] = useState(true)

  const [initialObj,setInitialObj] = useState({
    name: '',
    lastname: '',
    email: '',
    number: '',
    username: '',
    gender: '',
    password: '',
    repeatpass: ''
  })
  const [registerData, setRegisterData] = useState(initialObj)
 


  const [errors, setErrors] = useState({
    name: false,
    lastname: false,
    email: false,
    number: false,
    username: false,
    gender: false,
    password: false,
    repeatpass: false
  })
  const navigate=useNavigate()
  const handleSubmit = () => {
    const newErrors = { ...errors }

    // Validation for each field
    newErrors.name = !registerData.name.trim()
    newErrors.lastname = !registerData.lastname.trim()
    newErrors.email = !/\S+@\S+\.\S+/.test(registerData.email) // Email regex validation
    newErrors.number = !/^\d{10}$/.test(registerData.number) // Mobile number validation (10 digits)
    newErrors.username = !registerData.username.trim()
    newErrors.gender = !registerData.gender.trim()
    newErrors.password = !registerData.password.trim() || registerData.password.length < 6 // Password length validation
    newErrors.repeatpass = registerData.password !== registerData.repeatpass

    setErrors(newErrors)

    if (Object.values(newErrors).includes(true)) {
      toast.error('Please fill all the fields correctly.')
    } else {
      toast.success('Successfully Registered!')
      navigate('/cabinet')
      localStorage.setItem('registerData', JSON.stringify(registerData))
      setRegisterData(initialObj)
    }
  }
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
            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%] focus:outline-none' placeholder='First Name' />
          {errors.name && <p className="text-[.7em] text-red-600">First name is required</p>}
          <p className=' font-bold'>LAST NAME</p>
          <input
            required
            value={registerData.lastname}
            onChange={(e) => {
              setRegisterData({ ...registerData, lastname: e.target.value })
            }}
            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%] focus:outline-none' placeholder='Last Name' />
         {errors.name && <p className="text-[.7em] text-red-600">Last name is required</p>} 
          <p className=' font-bold'>USERNAME</p>
          <input
            required
            value={registerData.username}
            onChange={(e) => {
              setRegisterData({ ...registerData, username: e.target.value })
            }}
            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%] focus:outline-none' placeholder='Username' />
            {errors.name && <p className="text-[.7em] text-red-600">Username is required</p>} 
          <p className=' font-bold'>EMAIL</p>
          <input
            required
            value={registerData.email}
            onChange={(e) => {
              setRegisterData({ ...registerData, email: e.target.value })
            }}
            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%] focus:outline-none' placeholder='Email' />
            {errors.email && <p className="text-[.7em] text-red-600">Invalid email address</p>}
          <p className=' font-bold'>MOBILE NUMBER</p>
          <input
            required
            value={registerData.number}
            onChange={(e) => {
              setRegisterData({ ...registerData, number: e.target.value })
            }}
            type="tel" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%] focus:outline-none' placeholder='Mobile Numbers' />
            {errors.number && <p className="text-[.7em] text-red-600">Enter a valid 10-digit mobile number</p>}
          <p className=' font-bold'>GENDER</p>
          <select
            required
            value={registerData.gender}
            onChange={(e) => {
              setRegisterData({ ...registerData, gender: e.target.value })
            }}
            className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%] focus:outline-none'>
            <option value="" hidden>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female </option>
          </select>
          {errors.gender && <p className="text-[.7em] text-red-600">Gender is required</p>}

          <p className=' font-bold'>PASSWORD</p>
          <div className='flex border-[1px] border-gray-400 rounded p-[3px] justify-between   w-[95%]'>
            <input
              required
              type={hidePassword1 ? 'password' : 'text'}
              className='w-[100%] focus:outline-none' placeholder='Password'
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
          {errors.password && <p className="text-[.7em] text-red-600">Password must be at least 6 characters</p>}
          <p className=' font-bold'>REPEAT PASSWORD</p>
          <div className='flex border-[1px] border-gray-400 rounded p-[3px] justify-between   w-[95%]'>
            <input
              required
              type={hidePassword2 ? 'password' : 'text'}
              className='w-[100%] focus:outline-none' placeholder='Repeat Password'
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
          {errors.repeatpass && <p className="text-[.7em] text-red-600">Passwords do not match</p>}
          <div className='flex'>
            <input
              required
              type='checkbox' className='mb-[15px] mr-[5px] ' name="" id="" />
            <p>By registering, your account will be subjected to the Terms & Conditions and Privacy Policy</p>
          </div>
          <button
            className='bg-black my-[20px] h-[40px]  text-[1.2em] rounded text-white font-serif w-[96%] hover:bg-white hover:text-black border-[1px] border-black transition-all duration-200'
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
             

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
