import React, { useMemo, useState, createContext, useContext } from 'react'

import useWindowSize from '../../../Hooks/useWindowSize'

const Context = createContext()

export const useMainMenuContext = () => useContext(Context)

export const MainMenuProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false)
    const [theme, setTheme] = useState('primary')
    const [position, setPosition] = useState('left')
    const [showClose, setShowClose] = useState()
    const [showContinueBar, setShowContinueBar] = useState()
    const [staticToolbar, setStaticToolbar] = useState(false)
    const { width } = useWindowSize()

    useMemo(() => setPosition(width <= 1024 ? 'bottom' : 'left'), [width])
    useMemo(() => setShowContinueBar(width <= 1024), [width])
    useMemo(() => setToggle(width >= 1365), [width])
    useMemo(() => setStaticToolbar(width >= 1025 && width <= 1365), [width])
    useMemo(() => setShowClose(width <= 1365), [width])

    const onClose = () => {
        setToggle(false)
        setTheme('primary')
    }

    const value = {
        position,
        theme,
        setTheme,
        toggle,
        setToggle,
        showClose,
        staticToolbar,
        showContinueBar,
        setShowContinueBar,
        onClose
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withMainMenuProvider = Component => props => (
    <MainMenuProvider>
        <Component {...props} />
    </MainMenuProvider>
)
