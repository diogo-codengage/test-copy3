import PropTypes from 'prop-types'

import ESCircleProgress from 'sanar-ui/dist/Components/Atoms/CircleProgress'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANCircleProgressProps = PropTypes.InferProps<
    typeof ESCircleProgress.propTypes
>

const SANCircleProgress: SANElement<ISANCircleProgressProps> = SANStyled(
    ESCircleProgress
)``

export default SANCircleProgress
