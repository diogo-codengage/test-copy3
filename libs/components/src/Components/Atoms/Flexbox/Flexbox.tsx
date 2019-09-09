import React from 'react'

import {
    flexbox,
    color,
    FlexboxProps,
    ColorProps,
    compose
} from 'styled-system'

import { SANStyled } from '../../../Theme/createTheme'

interface IProps extends FlexboxProps, ColorProps {}

const SANFlexbox: React.FC<IProps> = SANStyled('div')`
    ${compose(
        flexbox,
        color
    )}
    display: flex;
`

export default SANFlexbox
