import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'react-eva-icons'

const ESEvaIcon = ({ className, style, size, color, ...props }) => {
    const classes = classNames(
        'es-eva-icon',
        className,
        `es-eva-icon--${size}`,
        `es-eva-icon--${color}`
    )

    return (
        <div style={style} className={classes}>
            <Icon {...props} />
        </div>
    )
}

ESEvaIcon.propTypes = Object.assign(
    { ...Icon['propTypes'] },
    {
        className: PropTypes.string,
        color: PropTypes.oneOf([
            'primary',
            'secondary',
            'success',
            'warning',
            'error',
            'info',
            'default'
        ])
    }
)

ESEvaIcon.defaultProps = Icon['defaultProps']

export default ESEvaIcon
