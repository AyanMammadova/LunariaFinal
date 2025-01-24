import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { Link } from 'react-router-dom'

function Login() {
    const [hidePassword, setHidePassword] = useState(false)
    const [loginData, setLoginData] = useState({ name: '', password: '' })
    const [nameError, setNameError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [loginError, setLoginError] = useState(false)
    function submit() {
        setPassError(loginData.password.trim() ? false : true)
        setNameError(loginData.name.trim() ? false : true)
        loginData.password.trim() && loginData.name.trim() ? setLoginError(true) : setLoginError(false)

    }
    return (
        <>
            <div className='max-w-[300px] pt-[150px] mx-[auto]'>
                <p className='text-[2em] text-center font-serif py-[20px]'>Login</p>
                <div className='w-[100%] my-[10px] border-[1px] border-gray-400'>
                    <input
                        className='w-[100%] focus:outline-none p-[3px]'
                        type="text"
                        placeholder='Username'
                        onChange={(e) => {
                            setLoginData({ ...loginData, name: e.target.value })
                        }}
                    />
                </div>
                <p className={`${nameError ? 'block' : 'hidden'} -mt-[4px] text-[.7em] text-red-600`}>Username is required</p>
                <div className='w-[100%]  my-[10px] border-[1px] border-gray-400 flex items-center justify-between'>
                    <input
                        className='w-[100%] focus:outline-none p-[3px]'
                        type={hidePassword ? 'password' : 'text'}
                        placeholder='Password'
                        onChange={(e) => {
                            setLoginData({ ...loginData, password: e.target.value })
                        }}
                    />

                    <div
                        className='cursor-pointer '
                        onClick={() => { setHidePassword(!hidePassword) }}>
                        {
                            hidePassword ? <LuEyeOff /> : <LuEye />
                        }

                    </div>
                </div>
                <p className={`${passError ? 'block' : 'hidden'} -mt-[4px] text-[.7em] text-red-600`}>Password is required</p>
                <p className={`${loginError ? 'block' : 'hidden'} -mt-[4px] text-[.9em] text-red-600`}>You don't have an account,Please Register</p>

                <button
                    onClick={() => { submit() }}
                    className='w-[100%] my-[10px]  bg-black py-[4px] text-white font-[600] transition-all duration-200 hover:bg-white hover:text-black border-[1px] border-black'>Sign in</button>
                <Link to={'/remind'}>
                    <p className='text-[.9em] py-[20px] underline'>Forgot Password?</p>
                </Link>
                <hr />
                <p className='text-center py-[10px] text-[1.2em] font-serif'>Don’t have an account?</p>
                <Link to={'/register'}>
                    <button
                        className='w-[100%] bg-white py-[4px] text-black font-[600] transition-all duration-200 hover:bg-black hover:text-white border-[1px] border-black'>
                        Create New Account
                    </button>
                </Link>


            </div>

        </>
    )
}

export default Login
