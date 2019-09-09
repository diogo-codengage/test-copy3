import PropTypes from 'prop-types'

import ESBadge from 'sanar-ui/dist/Components/Atoms/Badge'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANBadgeProps = PropTypes.InferProps<typeof ESBadge.propTypes>

const SANBadge: SANElement<ISANBadgeProps> = SANStyled(ESBadge)``

export default SANBadge
