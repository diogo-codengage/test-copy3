import React, { createContext, useContext } from 'react'

const Context = createContext()

export const useClassromContext = () => useContext(Context)

export const SANClassromProvider = ({ children }) => {
    const value = {}

    return <Context.Provider value={value}>{children}</Context.Provider>
}
