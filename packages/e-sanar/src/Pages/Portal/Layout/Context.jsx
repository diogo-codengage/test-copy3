import React, { createContext, useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const Context = createContext()

export const useLayoutContext = () => useContext(Context)

const LayoutProvider = ({ children, history }) => {
    const [darkMode, setDarkMode] = useState(false)
    const [indexMenu, setIndexMenu] = useState(0)
    const [openMenu, setOpenMenu] = useState(false)

    const value = {
        darkMode,
        setDarkMode,
        indexMenu,
        setIndexMenu,
        openMenu,
        setOpenMenu
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANLayoutProvider = withRouter(LayoutProvider)

export const withLayoutProvider = Component => props => (
    <SANLayoutProvider>
        <Component {...props} />
    </SANLayoutProvider>
)
