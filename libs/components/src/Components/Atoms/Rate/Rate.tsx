import React from 'react'
import PropTypes from 'prop-types'

import ESRate from 'sanar-ui/dist/Components/Atoms/Rate'
import { SANStyled } from '../../../Theme'

export type ISANRateProps = PropTypes.InferProps<typeof ESRate['propTypes']>

const SANRate: React.FC<ISANRateProps> = SANStyled(ESRate)``

export default SANRate
