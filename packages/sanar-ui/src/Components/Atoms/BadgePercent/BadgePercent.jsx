import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ESBadgePercent = ({
    count,
    suffix,
    status,
    fontSize,
    style,
    className
}) => {
    const classes = classNames(
        'es-badge-percent',
        `es-badge-percent--${status}`,
        className
    )
    const styles = {
        ...style,
        ...(fontSize && { fontSize })
    }
    return <div style={styles} className={classes}>{`${count}${suffix}`}</div>
}

ESBadgePercent.propTypes = {
    className: PropTypes.string,
    count: PropTypes.number,
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

ESBadgePercent.defaultProps = {
    suffix: '%'
}

export default ESBadgePercent
