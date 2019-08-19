import PropTypes from 'prop-types'

import {
    space,
    flexbox,
    border,
    SpaceProps,
    LayoutProps,
    FlexboxProps
} from 'styled-system'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { SANStyled, SANElement } from '../../../Theme/createTheme'

type ISANTypographyProps = PropTypes.InferProps<
    typeof ESTypography['propTypes']
> &
    SpaceProps &
    LayoutProps &
    FlexboxProps

const SANTypography: SANElement<ISANTypographyProps> = SANStyled(ESTypography)`
    ${space}
    ${flexbox}
    ${border}
`

export default SANTypography
