import React from 'react'
import PropTypes from 'prop-types'

import ESRate from 'sanar-ui/dist/Components/Atoms/Rate'
import { SANStyled } from '../../../Theme'

type IProps = PropTypes.InferProps<typeof ESRate['propTypes']>

const SANRate: React.FC<IProps> = SANStyled(ESRate)``

export default SANRate
