import React from 'react'
import PropTypes from 'prop-types'

import { ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

export type ISANColProps = PropTypes.InferProps<typeof propTypes> &
    PropTypes.InferProps<typeof ESCol.propTypes>

const SANBanner: React.FC<ISANColProps> = props => {
    return <ESCol {...props} />
}

const propTypes = {}

SANBanner.propTypes = propTypes
SANBanner.defaultProps = {}

export default SANBanner
