import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Progress } from 'antd'

const ESProgress = ({ className, square, status, goal, size, ...props }) => {
    const classes = classNames('es-progress', className, {
        'es-progress--square': square,
        'es-progress--warning': status === 'warning',
        'es-progress__goal': goal
    })

    const goalIndication = classNames('es-progress__goal__indicator', {
        'es-progress__goal__indicator--small': size === 'small',
        'es-progress__goal__indicator--medium': size === 'medium',
        'es-progress__goal__indicator--large': size === 'large'
    })

    return (
        <div className={classes}>
            <Progress size={size} {...props} />
            {goal && (
                <div
                    style={{ width: `calc(100% - ${goal}%)` }}
                    className={goalIndication}
                />
            )}
        </div>
    )
}

ESProgress.propTypes = Object.assign(
    { ...Progress['propTypes'] },
    {
        className: PropTypes.string,
        square: PropTypes.bool,
        goal: PropTypes.number,
        status: PropTypes.oneOf([
            'normal',
            'exception',
            'active',
            'success',
            'warning'
        ])
    }
)
ESProgress.defaultProps = {
    square: false,
    percent: 0,
    showInfo: false
}

export default ESProgress
