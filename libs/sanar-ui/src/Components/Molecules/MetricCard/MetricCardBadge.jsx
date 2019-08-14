import React from 'react'
import classNames from 'classnames'

const MetricCardBadge = ({ children, status }) => {
    const classes = classNames('es-metric-card-badge', {
        'es-metric-card-badge--success': status === 'success',
        'es-metric-card-badge--warning': status === 'warning',
        'es-metric-card-badge--danger': status === 'danger'
    })

    return (
        <div className={classes}>
            <strong>{children}</strong>
        </div>
    )
}

export default MetricCardBadge
