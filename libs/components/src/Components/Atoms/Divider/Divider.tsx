import { SpaceProps, space } from 'styled-system'
import { theme } from 'styled-tools'

import { SANStyled } from '../../../Theme/createTheme'

export interface ISANDividerProps extends SpaceProps {}

const SANDivider = SANStyled.div<ISANDividerProps>`
    ${space}
    
    background: ${theme('colors.grey.2')};

    display: block;
    clear: both;
    width: 100%;
    min-width: 100%;
    height: 1px;
    position: relative;
    top: -0.06em;
`
export default SANDivider
