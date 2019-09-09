import PropTypes from 'prop-types'

import { space, layout, LayoutProps, SpaceProps } from 'styled-system'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANButtonProps = PropTypes.InferProps<typeof propTypes> &
    SpaceProps &
    LayoutProps

const SANButton = SANStyled(ESButton)`
    && {
        ${space}
        ${layout}
    }
`

const propTypes = ESButton['propTypes']

export default SANButton
