import React from 'react'
import classNames from 'classnames'

import QuestionListItem from '../../Molecules/QuestionListItem'

const ESQuestionListItem = ({ className, ...props }) => {
    const classes = classNames('es-question-list__content--item', className)

    return <QuestionListItem className={classes} {...props} />
}

ESQuestionListItem.propTypes = QuestionListItem['propTypes']
ESQuestionListItem.defaultProps = QuestionListItem['defaultProps']

export default ESQuestionListItem
