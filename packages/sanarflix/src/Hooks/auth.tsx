import React, { createContext, useState, useContext } from 'react'

type FLXAuthContextValues = {
    me: any
    setMe(me: any): void
}

type FLXAuthContextProviderProps = {}

export const FLXAuthContext = createContext<Partial<FLXAuthContextValues>>({})

export const useAuthContext = () => useContext(FLXAuthContext)

export const FLXAuthProvider: React.FC<FLXAuthContextProviderProps> = ({
    children
}) => {
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
