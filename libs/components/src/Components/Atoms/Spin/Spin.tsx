import React from 'react'
import PropTypes from 'prop-types'

import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

type IProps = PropTypes.InferProps<typeof propTypes>

const SANButton: React.FC<IProps> = props => {
    return <ESSpin {...props} />
}

const propTypes = ESSpin['propTypes']

SANButton.propTypes = propTypes
SANButton.defaultProps = {}

export default SANButton
