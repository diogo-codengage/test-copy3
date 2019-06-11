import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESCard from '../../Molecules/Card'

import { withQuestionProvider } from './context'

const ESQuestionList = ({ className, ...props }) => {
    const classes = classNames('es-question-list', className)

    return <ESCard className={classes} {...props} />
}

ESQuestionList.propTypes = {
    className: PropTypes.string
}
ESQuestionList.defaultProps = {}

export default withQuestionProvider(ESQuestionList)
