import React, { createContext, useState, useContext } from 'react'

interface IMe {
    id: string
    name: string
}

type FLXAuthContextValues = {
    me: IMe
    setMe(me: IMe): void
}

type FLXAuthContextProviderProps = {}

export const FLXAuthContext = createContext<FLXAuthContextValues>(
    {} as FLXAuthContextValues
)

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
