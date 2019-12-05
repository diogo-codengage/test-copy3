import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import ESStopwatch from 'sanar-ui/dist/Components/Atoms/Stopwatch'

export type ISANStopwatchProps = PropTypes.InferProps<
    typeof ESStopwatch.propTypes
>

const SANStopwatch: React.FC<ISANStopwatchProps> = (props, ref) => (
    <ESStopwatch {...props} ref={ref} />
)

export default forwardRef(SANStopwatch)
