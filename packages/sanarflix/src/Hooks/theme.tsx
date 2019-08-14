import React, { useContext } from 'react'
import { ThemeContext, ThemeProvider } from 'styled-components'
import FLXTheme from 'Styles/Theme'

import { createTheme } from '@sanar/components/dist/Theme/createTheme'

type FLXThemeContextProviderProps = {}

export const useThemeContext = () => useContext(ThemeContext)

export const FLXThemeProvider: React.FC<FLXThemeContextProviderProps> = ({
    children
}) => {
    const theme = createTheme(FLXTheme)

    return (
        <ThemeProvider theme={theme}>
            <>{children}</>
        </ThemeProvider>
    )
}
