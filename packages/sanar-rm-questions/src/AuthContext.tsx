import React, { createContext, useContext } from 'react'

interface IAuthContext {
    userId: string
}

const AuthContext = createContext<IAuthContext>(null)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {

    const value: IAuthContext = {
        userId: 'null'
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
