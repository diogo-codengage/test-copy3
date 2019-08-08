import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider } from 'styled-components'

const ESThemeProvider = ({ theme: defaultTheme = {}, children }) => {
    const [theme, setTheme] = useState(defaultTheme)

    return (
        <ThemeProvider theme={{ ...theme, setTheme }}>{children}</ThemeProvider>
    )
}

ESThemeProvider.propTypes = {
    theme: PropTypes.object
}
ESThemeProvider.defaultProps = {}

export default ESThemeProvider
