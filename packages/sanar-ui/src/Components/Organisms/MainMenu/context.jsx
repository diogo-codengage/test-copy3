import React, { useMemo, useState, createContext, useContext } from 'react'

import useWindowSize from '../../../Hooks/useWindowSize'

const Context = createContext()

export const useMainMenuContext = () => useContext(Context)

export const MainMenuProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false)
    const [theme, setTheme] = useState('primary')
    const [position, setPosition] = useState('left')
    const { width } = useWindowSize()

    useMemo(() => setPosition(width <= 1024 ? 'bottom' : 'left'), [width])

    const value = {
        position,
        theme,
        setTheme,
        toggle,
        setToggle
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withMainMenuProvider = Component => props => (
    <MainMenuProvider>
        <Component {...props} />
    </MainMenuProvider>
)
