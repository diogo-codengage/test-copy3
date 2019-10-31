import React, { createContext, useState, useContext } from 'react'

import { IMe } from 'Apollo/User/Queries/me'

type FLXAuthContextValues = {
    me: IMe
    setMe: React.Dispatch<React.SetStateAction<IMe | undefined>>
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
