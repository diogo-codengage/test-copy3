import React from 'react'
import PropTypes from 'prop-types'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

type IProps = PropTypes.InferProps<typeof propTypes>

const SANTypography: React.FC<IProps> = props => {
    return <ESTypography {...props} />
}

const propTypes = {}

SANTypography.propTypes = propTypes
SANTypography.defaultProps = {}

export default SANTypography
