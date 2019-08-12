import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Skeleton } from 'antd'

type IProps = PropTypes.InferProps<typeof propTypes>

const ESSkeleton = ({ className, dark, ...props }: IProps) => {
    const classes = classNames('es-skeleton', className, {
        'es-skeleton--dark': dark
    })
    return <Skeleton className={classes} {...props} />
}
const propTypes = Object.assign(
    { ...Skeleton['propTypes'] },
    {
        className: PropTypes.string,
        dark: PropTypes.bool
    }
)

ESSkeleton.propTypes = propTypes

ESSkeleton.defaultProps = Skeleton['defaultProps']

export default ESSkeleton
