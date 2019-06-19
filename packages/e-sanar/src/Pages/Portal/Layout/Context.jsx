import React, { createContext, useState, useContext } from 'react'

export const DarkContext = createContext()

export const DarkProvider = ({ children }) => {
    const [dark, toggle] = useState(false)

    return (
        <DarkContext.Provider value={{ dark, toggle }}>
            {children}
        </DarkContext.Provider>
    )
}

export const useDarkContext = () => useContext(DarkContext)
