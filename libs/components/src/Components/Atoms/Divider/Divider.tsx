import {
    SpaceProps,
    space,
    flexbox,
    FlexboxProps,
    color,
    ColorProps
} from 'styled-system'
import { theme } from 'styled-tools'

import { SANStyled } from '../../../Theme/createTheme'

export interface ISANDividerProps
    extends SpaceProps,
        ColorProps,
        FlexboxProps {}

const SANDivider = SANStyled.div<ISANDividerProps>`
    ${space}
    ${color}
    ${flexbox}
    
    background-color: ${props =>
        props.backgroundColor || props.bg || theme('colors.grey.2')};

    display: block;
    clear: both;
    width: 100%;
    min-width: 100%;
    height: 1px;
    position: relative;
    top: -0.06em;
`
export default SANDivider
