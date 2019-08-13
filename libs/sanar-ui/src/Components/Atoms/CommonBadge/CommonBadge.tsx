import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Interface } from 'readline';

const ESCommonBadge: React.FC<IProps> = ({
    count,
    suffix,
    status,
    fontSize,
    style,
    className
}) => {
    const classes = classNames(
        'es-common-badge',
        `es-common-badge--${status}`,
        className
    )
    const styles = {
        ...style,
        ...(fontSize && { fontSize })
    }
    return <div style={styles} className={classes}>{`${count}${suffix}`}</div>
}

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign({
    className: PropTypes.string,
    style: PropTypes.string,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    status: PropTypes.oneOf([
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'default'
    ])
})

ESCommonBadge.propTypes = propTypes

ESCommonBadge.defaultProps = {
    suffix: ''
}

export default ESCommonBadge
