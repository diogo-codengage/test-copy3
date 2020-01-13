import React from 'react'
import PropTypes from 'prop-types'

import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar'

export type ISANScrollProps = PropTypes.InferProps<
    typeof PerfectScrollbar['propTypes']
> & {
    [x: string]: any
}

const SANScroll: React.FC<ISANScrollProps> = props => (
    <PerfectScrollbar {...props} />
)

export default SANScroll
