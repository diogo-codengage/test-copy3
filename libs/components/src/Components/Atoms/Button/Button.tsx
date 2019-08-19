import PropTypes from 'prop-types'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANButtonProps = PropTypes.InferProps<typeof propTypes>

const SANButton = SANStyled(ESButton)``

const propTypes = ESButton['propTypes']

export default SANButton
