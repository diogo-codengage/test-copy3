import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESTypography from '../../Atoms/Typography'

const ESQuestionListHeader = ({ className, title, children, ...props }) => {
    const classes = classNames('es-question-list__header', className)

    return (
        <div className={classes} {...props}>
            <ESTypography className='text-color-grey-7' variant='subtitle2'>
                {title}
            </ESTypography>
            <span>{children}</span>
        </div>
    )
}

ESQuestionListHeader.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}
ESQuestionListHeader.defaultProps = {}

export default ESQuestionListHeader
