import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ESQuestionListFooter: React.FC<any> = ({ className, ...props }) => {
    const classes = classNames('es-question-list__footer', className)

    return <div className={classes} {...props} />
}

ESQuestionListFooter.propTypes = {
    className: PropTypes.string
}
ESQuestionListFooter.defaultProps = {}

export default ESQuestionListFooter
