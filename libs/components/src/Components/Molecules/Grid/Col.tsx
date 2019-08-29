import React from 'react'
import PropTypes from 'prop-types'

import {
    space,
    layout,
    flexbox,
    SpaceProps,
    FlexboxProps,
    LayoutProps
} from 'styled-system'

import { ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANColProps = PropTypes.InferProps<typeof ESCol.propTypes> &
    LayoutProps &
    FlexboxProps &
    SpaceProps

const SANCol = SANStyled(ESCol)`
    ${layout}
    ${space}
    ${flexbox}
`
export default SANCol
