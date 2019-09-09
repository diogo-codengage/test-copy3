import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ESCommonBadge = ({
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
    return (
        <div
            style={styles}
            className={classes}
            data-testid='es-common-badge'
        >{`${count}${suffix}`}</div>
    )
}

ESCommonBadge.propTypes = {
    className: PropTypes.string,
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
}

ESCommonBadge.defaultProps = {
    suffix: ''
}

export default ESCommonBadge
