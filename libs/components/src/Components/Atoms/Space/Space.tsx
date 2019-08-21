import React from 'react'

import { space, SpaceProps, ColorProps, compose } from 'styled-system'
import { SANStyled } from 'Theme/createTheme'

interface IProps extends SpaceProps, ColorProps {}

const SANSpace: React.FC<IProps> = SANStyled('div')`
    ${compose(space)}
`

export default SANSpace
