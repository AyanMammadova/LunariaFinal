import React, { useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { Link } from 'react-router-dom'

function Login() {
    const [hidePassword, setHidePassword] = useState(false)
    return (
        <>
            <div className='max-w-[300px] pt-[150px] mx-[auto]'>
                <p className='text-[2em] text-center font-serif py-[20px]'>Login</p>
                <div className='w-[100%] my-[10px] border-[1px] border-gray-400'>
                    <input type="tel" placeholder='Mobile Nmber' />
                </div>
                <div className='w-[100%]  my-[10px] border-[1px] border-gray-400 flex justify-between'>
                    <input 
                    type={hidePassword ? 'password' : 'text'}  
                    placeholder='Password' />
                    
                    <div
                        className='cursor-pointer'
                        onClick={() => { setHidePassword(!hidePassword) }}>
                        {
                        hidePassword ? <LuEyeOff /> : <LuEye />
                        }

                    </div>
                </div>
                <button className='w-[100%] my-[10px]  bg-black py-[4px] text-white font-[600] transition-all duration-200 hover:bg-white hover:text-black border-[1px] border-black'>Sign in</button>
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
