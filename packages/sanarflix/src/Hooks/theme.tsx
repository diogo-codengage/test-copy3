import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { SANThemeCreateTheme, SANThemeProvider } from '@sanar/components'

type FLXThemeContextProviderProps = {}

const theme = {
    colors: {
        primary: '#600F30'
    }
}

export const lightTheme = SANThemeCreateTheme(theme)

export const useThemeContext = () => useContext(ThemeContext)

export const FLXThemeProvider: React.FC<FLXThemeContextProviderProps> = ({
    children
}) => {
    return <SANThemeProvider theme={lightTheme}>{children}</SANThemeProvider>
}
