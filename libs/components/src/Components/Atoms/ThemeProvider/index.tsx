import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider } from 'styled-components'

const SANThemeProvider = ({ theme: defaultTheme = {}, children }) => {
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <ThemeProvider theme={{ ...theme, setTheme }}>{children}</ThemeProvider>
  )
}

SANThemeProvider.propTypes = {
  theme: PropTypes.object
}
SANThemeProvider.defaultProps = {}

export default SANThemeProvider
