import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESTypography from '../Typography'
import ESEvaIcon from '../EvaIcon'

const ESCardContinueCourse = ({
    className,
    onContinue,
    module,
    description,
    borderRadius
}) => {
    const classes = classNames('es-card-continue-course', className, {
        'es-card-continue-course--radius': borderRadius
    })
    return (
        <div onClick={onContinue} className={classes}>
            <div className='es-card-continue-course--texts'>
                <ESTypography variant='caption' className='text-grey-6'>
                    {module}
                </ESTypography>
                <ESTypography
                    strong
                    variant='caption'
                    className='text-grey-8'
                    ellipsis
                >
                    {description}
                </ESTypography>
            </div>

            <ESEvaIcon name='play-circle' size='large' />
        </div>
    )
}

ESCardContinueCourse.propTypes = {
    className: PropTypes.string,
    onContinue: PropTypes.func,
    module: PropTypes.string,
    description: PropTypes.string,
    borderRadius: PropTypes.bool
}
ESCardContinueCourse.defaultProps = {
    borderRadius: true
}

export default ESCardContinueCourse
