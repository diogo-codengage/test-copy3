import React, { useState } from 'react'

import { ThemeProvider } from 'styled-components'

export const SANThemeProvider = ({ theme: defaultTheme = {}, children }) => {
    const [theme, setTheme] = useState(defaultTheme)

    return (
        <ThemeProvider theme={{ ...theme, setTheme }}>{children}</ThemeProvider>
    )
}
