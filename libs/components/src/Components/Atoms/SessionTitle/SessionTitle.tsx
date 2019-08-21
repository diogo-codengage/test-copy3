import PropTypes from 'prop-types'
import { space, SpaceProps } from 'styled-system'

import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANSessionTitleProps = PropTypes.InferProps<
    typeof ESSessionTitle['propTypes']
> &
    SpaceProps

const SANSessionTitle = SANStyled(ESSessionTitle)`
    ${space}
`

export default SANSessionTitle
