import { createGlobalStyle } from 'styled-components'
import { theme } from 'styled-tools'

const RMGlobalStyle = createGlobalStyle`
  &&& {
    @font-face {
      font-family: 'Nunito Sans', sans-serif !important;
      src: url('https://fonts.googleapis.com/css?family=Nunito+Sans:700,400');
      font-display: swap;
    }

    body {
      overflow-x: hidden;
      background-color: ${theme('colors.grey-solid.0')} !important;
      height: auto !important;
    }

    #root {
      min-height: 100vh;
    }
  }
`

export default RMGlobalStyle
