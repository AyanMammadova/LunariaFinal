import React, { createContext, useEffect, useState } from 'react'

export const USER = createContext(null)
function UserInfoContext({ children }) {
    const [isUserIn, setIsUserIn] = useState(false)
    const [AllRegisters, setAllRegisters] = useState(JSON.parse(localStorage.getItem('registerLocal')) || [])
    const [loginData, setLoginData] = useState(
        JSON.parse(localStorage.getItem('loginLocal')) ||
        {
            name: '',
            password: ''
        })
    useEffect(() => {
        localStorage.setItem('loginLocal', JSON.stringify(loginData));
    }, [loginData])

    function handleUserIn() {
        setIsUserIn(true)
    }
    return (
        <USER.Provider
            value={{
                handleUserIn,
                isUserIn,
                setIsUserIn,
                loginData,
                setLoginData
            }}
        >
            {children}
        </USER.Provider>
    )
}

export default UserInfoContext
