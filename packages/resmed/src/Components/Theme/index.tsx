import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { SANThemeCreateTheme, SANThemeProvider } from '@sanar/components'

type RMThemeContextProviderProps = {}

const theme = {
    colors: {
        primary: '#099E76'
    }
}

export const lightTheme = SANThemeCreateTheme(theme)

export const useThemeContext = () => useContext(ThemeContext)

export const RMThemeProvider: React.FC<RMThemeContextProviderProps> = props => {
    return <SANThemeProvider theme={lightTheme} {...props} />
}
