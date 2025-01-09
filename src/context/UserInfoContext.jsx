import React, { createContext, useEffect, useState } from 'react'

export const USER = createContext(null)
function UserInfoContext({ children }) {
    const [isUserIn, setIsUserIn] = useState(false)
    const [AllRegisters, setAllRegisters] = useState(JSON.parse(localStorage.getItem('registerLocal')) || [])
    
    useEffect(() => {
        localStorage.setItem('registerLocal', JSON.stringify(AllRegisters));
    }, [AllRegisters])

    function handleNewRegister(registerData){
        setAllRegisters([
            ...AllRegisters,
            {registerData}
        ])

        setIsUserIn(true)
    }
    console.log(AllRegisters)
    
    return (
        <USER.Provider
            value={{
                isUserIn,
                setIsUserIn,
                handleNewRegister
            }}
        >
            {children}
        </USER.Provider>
    )
}

export default UserInfoContext
