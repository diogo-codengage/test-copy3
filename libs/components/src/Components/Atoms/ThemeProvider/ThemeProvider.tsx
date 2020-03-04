import React, { useState } from 'react'

import { ThemeProvider } from 'styled-components'

import { Theme } from '../../../Theme/createTheme'

export interface ISANThemeProviderProps {
    theme: Theme
}

export const SANThemeProvider: React.FC<ISANThemeProviderProps> = ({
    theme: defaultTheme = {},
    children
}) => {
    const [theme, setTheme] = useState(defaultTheme)

    return (
        <ThemeProvider theme={{ ...theme, setTheme }}>
            {children as any}
        </ThemeProvider>
    )
}
