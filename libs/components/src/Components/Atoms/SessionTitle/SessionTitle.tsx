import React from 'react'
import PropTypes from 'prop-types'

import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'

export type ISANSessionTitleProps = PropTypes.InferProps<typeof propTypes>

const SANSessionTitle: React.FC<ISANSessionTitleProps> = props => {
    return <ESSessionTitle {...props} />
}

const propTypes = ESSessionTitle['propTypes']

SANSessionTitle.defaultProps = {}

export default SANSessionTitle
