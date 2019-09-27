import PropTypes from 'prop-types'

import {
    space,
    layout,
    position,
    PositionProps,
    LayoutProps,
    SpaceProps
} from 'styled-system'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANButtonProps = PropTypes.InferProps<typeof propTypes> &
    SpaceProps &
    LayoutProps &
    PositionProps

const SANButton = SANStyled(ESButton)`
    && {
        ${space}
        ${layout}
        ${position}
    }
`

const propTypes = ESButton['propTypes']

export default SANButton
