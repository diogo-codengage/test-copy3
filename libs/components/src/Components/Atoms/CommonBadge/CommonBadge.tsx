import PropTypes from 'prop-types'

import ESCommonBadge from 'sanar-ui/dist/Components/Atoms/CommonBadge'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANCommonBadgeProps = PropTypes.InferProps<
    typeof ESCommonBadge.propTypes
>

const SANCommonBadge: SANElement<ISANCommonBadgeProps> = SANStyled(
    ESCommonBadge
)``

export default SANCommonBadge
