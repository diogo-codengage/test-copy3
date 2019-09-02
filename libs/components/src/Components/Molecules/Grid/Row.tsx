import PropTypes from 'prop-types'

import {
    color,
    space,
    layout,
    flexbox,
    ColorProps,
    FlexboxProps,
    LayoutProps,
    SpaceProps
} from 'styled-system'

import { ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANRowProps = PropTypes.InferProps<typeof ESRow.propTypes> &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    ColorProps

const SANRow = SANStyled(ESRow)`
    ${space}
    ${layout}
    ${flexbox}
    ${color}
`

export default SANRow
