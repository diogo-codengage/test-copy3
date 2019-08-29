import React, { useContext, createContext, useEffect } from 'react'

import { useLayoutContext } from 'Pages/Layout/Context'
import { useThemeContext, darkTheme, lightTheme } from 'Hooks/theme'

interface IFLXClassroomProviderValue {}

const Context = createContext<IFLXClassroomProviderValue>({} as any)
export const useCoursesContext = () => useContext(Context)

const FLXClassroomProvider: React.FC = ({ children }) => {
    const { setTheme } = useThemeContext()
    const { setDarkMode, setMenuTab, setMenuContext } = useLayoutContext()

    useEffect(() => {
        setDarkMode(true)
        setTheme(darkTheme)
        setMenuContext('classroom')
        return () => {
            setMenuTab(0)
            setDarkMode(false)
            setTheme(lightTheme)
            setMenuContext('general')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value: IFLXClassroomProviderValue = {}

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default FLXClassroomProvider
