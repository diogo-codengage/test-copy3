import PropTypes from 'prop-types'

import {
    color,
    space,
    layout,
    flexbox,
    ColorProps,
    SpaceProps,
    FlexboxProps,
    LayoutProps
} from 'styled-system'

import { ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANColProps = PropTypes.InferProps<typeof ESCol.propTypes> &
    LayoutProps &
    FlexboxProps &
    SpaceProps &
    ColorProps

const SANCol = SANStyled(ESCol)`
    ${layout}
    ${space}
    ${flexbox}
    ${color}
`
export default SANCol
