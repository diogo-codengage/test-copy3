import React from 'react'
import PropTypes from 'prop-types'

import { ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'

export type ISANRowProps = PropTypes.InferProps<typeof propTypes> &
    PropTypes.InferProps<typeof ESRow.propTypes>

const SANBanner: React.FC<ISANRowProps> = props => {
    return <ESRow {...props} />
}

const propTypes = {}

SANBanner.propTypes = propTypes
SANBanner.defaultProps = {}

export default SANBanner
