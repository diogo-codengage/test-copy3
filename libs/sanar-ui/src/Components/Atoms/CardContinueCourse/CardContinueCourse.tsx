import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ESTypography from '../Typography'
import ESEvaIcon from '../EvaIcon'
import ESSkeleton from '../Skeleton'

const ESCardContinueCourse = ({
    className,
    onContinue,
    module,
    description,
    borderRadius,
    loading
}) => {
    const classes = classNames('es-card-continue-course', className, {
        'es-card-continue-course--radius': borderRadius
    })

    return (
        <div onClick={onContinue} className={classes}>
            <ESSkeleton
                active
                paragraph={{ rows: 1, width: '90%' }}
                title={{ width: '80%' }}
                loading={loading}
            >
                <div className='es-card-continue-course--texts'>
                    <ESTypography
                        variant='caption'
                        className='text-grey-6'
                        ellipsis
                    >
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

                <ESEvaIcon name='play-circle' size='xlarge' />
            </ESSkeleton>
        </div>
    )
}

ESCardContinueCourse.propTypes = {
    className: PropTypes.string,
    onContinue: PropTypes.func,
    module: PropTypes.string,
    description: PropTypes.string,
    borderRadius: PropTypes.bool,
    loading: PropTypes.bool
}
ESCardContinueCourse.defaultProps = {
    borderRadius: true
}

export default ESCardContinueCourse
