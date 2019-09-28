import {
    SpaceProps,
    space,
    flexbox,
    layout,
    FlexboxProps,
    color,
    ColorProps,
    LayoutProps
} from 'styled-system'
import { theme } from 'styled-tools'

import { SANStyled } from '../../../Theme/createTheme'

export interface ISANDividerProps
    extends SpaceProps,
        ColorProps,
        FlexboxProps,
        LayoutProps {}

const SANDivider = SANStyled.hr<ISANDividerProps>`
    ${space}
    ${color}
    ${flexbox}
    ${layout}
    
    background-color: ${props =>
        theme(`colors.${props.backgroundColor}`) ||
        theme(`colors.${props.bg}`) ||
        theme('colors.grey.2')};

    height: 1px;
    border: 0;
`
export default SANDivider
