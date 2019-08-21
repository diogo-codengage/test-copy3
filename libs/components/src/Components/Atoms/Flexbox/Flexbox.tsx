import React from 'react'

import {
    flexbox,
    FlexboxProps,
    SpaceProps,
    ColorProps,
    compose
} from 'styled-system'

import { SANStyled } from 'Theme/createTheme'

interface IProps extends FlexboxProps, ColorProps {}

const SANFlexbox: React.FC<IProps> = SANStyled('div')`
    ${compose(flexbox)}
    display: flex;
`

export default SANFlexbox
