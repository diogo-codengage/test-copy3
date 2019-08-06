import React, { useContext } from 'react'
import { ThemeContext, ThemeProvider } from 'styled-components'
import FLXTheme from 'Styles/Theme'

type FLXThemeContextProviderProps = {}

export const useThemeContext = () => useContext(ThemeContext)

export const FLXThemeProvider: React.FC<FLXThemeContextProviderProps> = ({
    children
}) => {
    return (
        <ThemeProvider theme={FLXTheme}>
            <>{children}</>
        </ThemeProvider>
    )
}
