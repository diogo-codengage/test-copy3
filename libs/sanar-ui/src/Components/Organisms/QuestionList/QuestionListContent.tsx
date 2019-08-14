import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ESQuestionListContent: React.FC<any> = ({ className, ...props }) => {
    const classes = classNames('es-question-list__content', className)

    return <ul className={classes} {...props} />
}

ESQuestionListContent.propTypes = {
    className: PropTypes.string
}
ESQuestionListContent.defaultProps = {}

export default ESQuestionListContent
