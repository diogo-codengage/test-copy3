import React, { createContext, useState, useContext } from 'react'

export const SANAuthContext = createContext()

export const useAuthContext = () => useContext(SANAuthContext)

export const SANAuthProvider = ({ children }) => {
    const [me, setMe] = useState()
    const [enrollment, setEnrollment] = useState()

    const value = {
        me,
        setMe,
        enrollment,
        setEnrollment
    }

    return (
        <SANAuthContext.Provider value={value}>
            {children}
        </SANAuthContext.Provider>
    )
}
