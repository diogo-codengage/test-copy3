import PropTypes from 'prop-types'

import {
    space,
    layout,
    flexbox,
    FlexboxProps,
    LayoutProps,
    SpaceProps
} from 'styled-system'

import { ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANRowProps = PropTypes.InferProps<typeof ESRow.propTypes> &
    SpaceProps &
    LayoutProps &
    FlexboxProps

const SANRow = SANStyled(ESRow)`
    ${space}
    ${layout}
    ${flexbox}
`

export default SANRow
