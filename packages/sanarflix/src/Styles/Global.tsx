import { createGlobalStyle } from 'styled-components'
import { theme } from 'styled-tools'

const FLXGlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nunito Sans', sans-serif !important;
    src: url('https://fonts.googleapis.com/css?family=Nunito+Sans:700,400');
  }

  body {
    overflow-x: hidden;
    background-color: ${theme('colors.grey-solid.0')};
  }

  #root {
    height: 100%;
  }
`

export default FLXGlobalStyle
