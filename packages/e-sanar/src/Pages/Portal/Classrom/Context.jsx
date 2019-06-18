import React, { createContext, useContext, useState } from 'react'

const Context = createContext()

export const useClassromContext = () => useContext(Context)

export const SANClassromProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState([])

    const value = {
        playlist,
        setPlaylist
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withClassromProvider = Component => props => (
    <SANClassromProvider>
        <Component {...props} />
    </SANClassromProvider>
)
