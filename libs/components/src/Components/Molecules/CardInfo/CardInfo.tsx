import PropTypes from 'prop-types'
import { space, SpaceProps } from 'styled-system'

import { SANStyled, SANElement } from '../../../Theme/createTheme'
import ESCardInfo from 'sanar-ui/dist/Components/Molecules/CardInfo'

export type ISANCardInfoProps = PropTypes.InferProps<
    typeof ESCardInfo['propTypes']
> &
    SpaceProps

const SANCardInfo: SANElement<ISANCardInfoProps> = SANStyled(ESCardInfo)`
    ${space}
`

export default SANCardInfo
