import React, { createContext, useState, useContext } from 'react'

export const SANAuthContext = createContext()

export const useAuthContext = () => useContext(SANAuthContext)

export const SANAuthProvider = ({ children }) => {
    const [me, setMe] = useState()

    const getEnrollment = (pos = 0) => me.enrollments[pos]

    const value = {
        me,
        setMe,
        getEnrollment
    }

    return (
        <SANAuthContext.Provider value={value}>
            {children}
        </SANAuthContext.Provider>
    )
}
