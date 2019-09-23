import PropTypes from 'prop-types'

import ESDropdown from 'sanar-ui/dist/Components/Atoms/Dropdown'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export interface ISANDropdownProps
    extends PropTypes.InferProps<typeof ESDropdown.propTypes> {}

const SANDropdown: SANElement<ISANDropdownProps> = SANStyled(ESDropdown)``

export default SANDropdown
