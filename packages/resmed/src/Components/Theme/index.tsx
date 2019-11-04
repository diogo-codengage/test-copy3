import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { SANThemeCreateTheme, SANThemeProvider } from '@sanar/components'

import { logoLight, logoDark, error500 } from 'Assets'

type RMThemeContextProviderProps = {}

const theme = {
    colors: {
        primary: '#099E76',
        'primary-1': '#d6fff4',
        'primary-2': '#9ef0da',
        'primary-3': '#4bcca9',
        'primary-4': '#099e76',
        'primary-5': '#066b50'
    },
    assets: {
        icons: {
            logo: {
                light: logoLight,
                dark: logoDark
            },
            errors: {
                error500
            }
        }
    }
}

export const lightTheme = SANThemeCreateTheme(theme)

export const useThemeContext = () => useContext(ThemeContext)

export const RMThemeProvider: React.FC<RMThemeContextProviderProps> = props => {
    return <SANThemeProvider theme={lightTheme} {...props} />
}
