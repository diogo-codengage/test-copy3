import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { SANThemeCreateTheme, SANThemeProvider } from '@sanar/components'

import {
    logoLight,
    logoDark,
    error500,
    errorGeneric,
    changePassword
} from 'Assets'

type RMThemeContextProviderProps = {}

const primary = '#099E76'

const theme = {
    colors: {
        primary,
        'primary-1': '#d6fff4',
        'primary-2': '#9ef0da',
        'primary-3': '#4bcca9',
        'primary-4': primary,
        'primary-5': '#066b50'
    },
    assets: {
        icons: {
            logo: {
                light: logoLight,
                dark: logoDark
            },
            auth: {
                changePassword
            },
            errors: {
                error500,
                errorGeneric
            }
        }
    }
}

export const lightTheme = SANThemeCreateTheme(theme)

export const useThemeContext = () => useContext(ThemeContext)

export const RMThemeProvider: React.FC<RMThemeContextProviderProps> = props => {
    return <SANThemeProvider theme={lightTheme} {...props} />
}
