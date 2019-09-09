import PropTypes from 'prop-types'

import { space, layout, LayoutProps, SpaceProps } from 'styled-system'

import { ESButtonGroup } from 'sanar-ui/dist/Components/Atoms/Button'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANButtonGroupProps = PropTypes.InferProps<
    typeof ESButtonGroup['propTypes']
> &
    SpaceProps &
    LayoutProps

const SANButtonGroup = SANStyled(ESButtonGroup)`
    && {
        ${space}
        ${layout}
    }
`

export default SANButtonGroup
