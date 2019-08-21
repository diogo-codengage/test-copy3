import PropTypes from 'prop-types'

import { ESRadioButton } from 'sanar-ui/dist/Components/Atoms/Radio'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANRadioButtonProps = PropTypes.InferProps<
    typeof ESRadioButton['propTypes']
>

const SANRadioButton = SANStyled(ESRadioButton)``

export default SANRadioButton
