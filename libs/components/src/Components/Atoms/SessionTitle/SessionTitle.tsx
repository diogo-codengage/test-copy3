import React from 'react'
import PropTypes from 'prop-types'

import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'

type IProps = PropTypes.InferProps<typeof propTypes>

const SANSessionTitle: React.FC<IProps> = props => {
    return <ESSessionTitle {...props} />
}

const propTypes = ESSessionTitle['propTypes']

SANSessionTitle.defaultProps = {}

export default SANSessionTitle
