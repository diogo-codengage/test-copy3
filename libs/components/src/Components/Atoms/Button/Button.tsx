import React from 'react'
import PropTypes from 'prop-types'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

type IProps = PropTypes.InferProps<typeof propTypes>

const SANButton: React.FC<IProps> = props => {
    return <ESButton {...props} />
}

const propTypes = {}

SANButton.propTypes = propTypes
SANButton.defaultProps = {}

export default SANButton
