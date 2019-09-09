import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { SANThemeCreateTheme, SANThemeProvider } from '@sanar/components'

type FLXThemeContextProviderProps = {}

const theme = {
    colors: {
        primary: '#600F30',
        'primary-1': '#2E0716',
        'primary-2': '#470B23',
        'primary-3': '#600F30',
        'primary-4': '#7A2044',
        'primary-5': '#94355B',
        'primary-6': '#AD5075',
        'primary-7': '#C76F92',
        'primary-8': '#C76F92',
        'primary-9': '#FAC3D9',
        'primary-10': '#FFE6F0'
    }
}

export const lightTheme = SANThemeCreateTheme(theme)

export const useThemeContext = () => useContext(ThemeContext)

export const FLXThemeProvider: React.FC<FLXThemeContextProviderProps> = ({
    children
}) => {
    return <SANThemeProvider theme={lightTheme}>{children}</SANThemeProvider>
}
