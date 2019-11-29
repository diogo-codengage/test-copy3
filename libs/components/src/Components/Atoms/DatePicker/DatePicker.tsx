import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import ESDatePicker from 'sanar-ui/dist/Components/Atoms/DatePicker'

export type ISANDatePickerProps = PropTypes.InferProps<
    typeof ESDatePicker.propTypes
>

const SANDatePicker = (props, ref) => <ESDatePicker {...props} ref={ref} />

export default forwardRef(SANDatePicker)
