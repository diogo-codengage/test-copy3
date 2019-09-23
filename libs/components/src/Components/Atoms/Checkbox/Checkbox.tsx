import React from 'react'
import PropTypes from 'prop-types'

import ESCheckbox from 'sanar-ui/dist/Components/Atoms/Checkbox'
import { SANStyled } from '../../../Theme'

export type ISANCheckboxProps = PropTypes.InferProps<
    typeof ESCheckbox['propTypes']
>

const SANCheckbox: React.FC<ISANCheckboxProps> = SANStyled(ESCheckbox)``

export default SANCheckbox
