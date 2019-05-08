import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'react-eva-icons'

const ESEvaIcon = ({ className, style, size, color, ...props }) => {
    const classes = classNames('anticon', 'es-eva-icon', className, {
        [`es-eva-icon--${size}`]: size,
        [`es-eva-icon--${color}`]: color
    })

    return (
        <i style={style} className={classes}>
            <Icon {...props} />
        </i>
    )
}

ESEvaIcon.propTypes = Object.assign(
    { ...Icon['propTypes'] },
    {
        className: PropTypes.string,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
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
