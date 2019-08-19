import React, { useContext } from 'react'
import { ThemeContext, ThemeProvider } from 'styled-components'
import FLXTheme from 'Styles/Theme'

import { SANThemeCreateTheme } from '@sanar/components'

type FLXThemeContextProviderProps = {}

export const useThemeContext = () => useContext(ThemeContext)

const theme = SANThemeCreateTheme(FLXTheme)

export const FLXThemeProvider: React.FC<FLXThemeContextProviderProps> = ({
    children
}) => {
    return (
        <ThemeProvider theme={theme}>
            <>{children}</>
        </ThemeProvider>
    )
}
