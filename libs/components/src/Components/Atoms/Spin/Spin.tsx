import React from 'react'
import PropTypes from 'prop-types'

import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'
import { SANStyled } from '../../../Theme'

type IProps = PropTypes.InferProps<typeof ESSpin['propTypes']>

const SANSpin: React.FC<IProps> = SANStyled(ESSpin)``

export default SANSpin
