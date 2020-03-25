import React, { createContext, useState, useContext } from 'react'
import { Auth } from 'aws-amplify'

export const SANAuthContext = createContext()

export const useAuthContext = () => useContext(SANAuthContext)

export const SANAuthProvider = ({ children }) => {
    const [me, setMe] = useState()
    const [enrollment, setEnrollment] = useState()

    const logout = (history) => {
        Auth.signOut().then(() => {
            history.push('/')
        })
    }

    const value = {
        me,
        setMe,
        enrollment,
        setEnrollment,
        logout
    }

    return (
        <SANAuthContext.Provider value={value}>
            {children}
        </SANAuthContext.Provider>
    )
}
