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
        theme(`colors.${props.backgroundColor as any}`) ||
        theme(`colors.${props.bg as any}`) ||
        theme('colors.grey.2')};

    height: 1px;
    border: 0;
`
export default SANDivider
