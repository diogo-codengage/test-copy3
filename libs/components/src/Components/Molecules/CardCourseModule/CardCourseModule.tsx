import React from 'react'
import PropTypes from 'prop-types'

import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'

type IProps = PropTypes.InferProps<typeof propTypes>

const SANCardCourseModule: React.FC<IProps> = props => {
    return <ESCardCourseModule {...props} />
}

const propTypes = ESCardCourseModule['propTypes']

SANCardCourseModule.defaultProps = {}

export default SANCardCourseModule
