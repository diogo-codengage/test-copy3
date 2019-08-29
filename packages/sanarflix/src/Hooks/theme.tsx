import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import FLXTheme from 'Styles/Theme'

import { SANThemeCreateTheme, SANThemeProvider } from '@sanar/components'
import { defaultDarkColors } from '@sanar/components/dist/Theme'

type FLXThemeContextProviderProps = {}

export const lightTheme = SANThemeCreateTheme(FLXTheme)
export const darkTheme = SANThemeCreateTheme({ colors: defaultDarkColors })

export const useThemeContext = () => useContext(ThemeContext)

export const FLXThemeProvider: React.FC<FLXThemeContextProviderProps> = ({
    children
}) => {
    return <SANThemeProvider theme={lightTheme}>{children}</SANThemeProvider>
}
