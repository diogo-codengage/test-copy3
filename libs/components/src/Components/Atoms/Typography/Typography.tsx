import PropTypes from 'prop-types'

import {
    space,
    flexbox,
    border,
    color,
    typography,
    position,
    layout,
    PositionProps,
    SpaceProps,
    ColorProps,
    LayoutProps,
    FlexboxProps,
    TypographyProps,
    compose
} from 'styled-system'
import styled from 'styled-components'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

export type ISANTypographyProps = PropTypes.InferProps<
    typeof ESTypography['propTypes']
> &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    ColorProps &
    TypographyProps &
    PositionProps

const SANTypography = styled(ESTypography)<ISANTypographyProps>`
    &&& {
        ${compose(space, flexbox, border, color, typography, position, layout)}
    }
`

export default SANTypography
