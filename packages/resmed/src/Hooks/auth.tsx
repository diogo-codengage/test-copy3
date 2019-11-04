import React, { createContext, useState, useContext } from 'react'

import { IMe } from 'Apollo/User/Queries/me'
import { ISubscription } from 'Apollo/User/Queries/subscription'

type FLXAuthContextValues = {
    me: IMe
    setMe: React.Dispatch<React.SetStateAction<IMe | undefined>>
    subscription: ISubscription
    setSubscription: React.Dispatch<
        React.SetStateAction<ISubscription | undefined>
    >
}

const FLXAuthContext = createContext<FLXAuthContextValues>(
    {} as FLXAuthContextValues
)

export const useAuthContext = () => useContext(FLXAuthContext)

export const RMAuthProvider: React.FC = ({ children }) => {
    const [me, setMe] = useState()
    const [subscription, setSubscription] = useState()

    const value = {
        me,
        setMe,
        setSubscription,
        subscription
    }

    return (
        <FLXAuthContext.Provider value={value}>
            {children}
        </FLXAuthContext.Provider>
    )
}
