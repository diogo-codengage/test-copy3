import React, { forwardRef, RefForwardingComponent } from 'react'
import PropTypes from 'prop-types'

import ESStopwatch from 'sanar-ui/dist/Components/Atoms/Stopwatch'

export type ISANStopwatchProps = PropTypes.InferProps<
    typeof ESStopwatch.propTypes
>

const SANStopwatch: React.FC<ISANStopwatchProps> = props => (
    <ESStopwatch {...props} />
)

export default forwardRef(SANStopwatch)
