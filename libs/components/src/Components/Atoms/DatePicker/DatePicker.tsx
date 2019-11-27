import PropTypes from 'prop-types'

import ESDatePicker from 'sanar-ui/dist/Components/Atoms/DatePicker'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANDatePickerProps = PropTypes.InferProps<
    typeof ESDatePicker.propTypes
>

const SANDatePicker = SANStyled(ESDatePicker)``

export default SANDatePicker
