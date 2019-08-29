import PropTypes from 'prop-types'

import ESDisciplineDropdown from 'sanar-ui/dist/Components/Molecules/DisciplineDropdown'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANDisciplineDropdownProps = PropTypes.InferProps<
    typeof ESDisciplineDropdown.propTypes
>

const SANDisciplineDropdown: SANElement<
    ISANDisciplineDropdownProps
> = SANStyled(ESDisciplineDropdown)``

export default SANDisciplineDropdown
