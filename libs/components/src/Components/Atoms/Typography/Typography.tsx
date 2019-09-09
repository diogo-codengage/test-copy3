import PropTypes from 'prop-types'

import {
    space,
    flexbox,
    border,
    color,
    typography,
    SpaceProps,
    ColorProps,
    LayoutProps,
    FlexboxProps,
    TypographyProps,
    compose
} from 'styled-system'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { SANStyled, SANElement } from '../../../Theme/createTheme'

type ISANTypographyProps = PropTypes.InferProps<
    typeof ESTypography['propTypes']
> &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    ColorProps &
    TypographyProps

const SANTypography: SANElement<ISANTypographyProps> = SANStyled(ESTypography)`
    &&& {
        ${compose(
            space,
            flexbox,
            border,
            color,
            typography
        )}
    }
`

export default SANTypography
