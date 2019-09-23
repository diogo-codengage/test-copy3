import PropTypes from 'prop-types'

import { ESDropdownButton } from 'sanar-ui/dist/Components/Atoms/Dropdown'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export interface ISANDropdownButtonProps
    extends PropTypes.InferProps<typeof ESDropdownButton.propTypes> {}

const SANDropdownButton: SANElement<ISANDropdownButtonProps> = SANStyled(
    ESDropdownButton
)``

export default SANDropdownButton
