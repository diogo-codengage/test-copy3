import React, { createContext, useState, useContext } from 'react'

type FLXAuthContextValues = {
    me: any
    setMe: React.Dispatch<React.SetStateAction<any>>
}

const FLXAuthContext = createContext<FLXAuthContextValues>(
    {} as FLXAuthContextValues
)

export const useAuthContext = () => useContext(FLXAuthContext)

export const RMAuthProvider: React.FC = ({ children }) => {
    const [me, setMe] = useState()

    const value = {
        me,
        setMe
    }

    return (
        <FLXAuthContext.Provider value={value}>
            {children}
        </FLXAuthContext.Provider>
    )
}
