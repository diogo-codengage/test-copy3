import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Skeleton } from 'antd'

const ESSkeleton = ({ className, dark, ...props }) => {
    const classes = classNames('es-skeleton', className, {
        'es-skeleton--dark': dark
    })
    return <Skeleton className={classes} {...props} />
}

ESSkeleton.propTypes = Object.assign(
    { ...Skeleton['propTypes'] },
    {
        className: PropTypes.string,
        dark: PropTypes.bool
    }
)

ESSkeleton.defaultProps = Skeleton['defaultProps']

export default ESSkeleton
