import React from 'react'

import { flexbox, FlexboxProps, ColorProps, compose } from 'styled-system'

import { SANStyled } from 'Theme/createTheme'

interface IProps extends FlexboxProps, ColorProps {
    displayFlex?: boolean
}

const SANFlexbox: React.FC<IProps> = SANStyled('div')`
    ${compose(flexbox)}
`

export default SANFlexbox
