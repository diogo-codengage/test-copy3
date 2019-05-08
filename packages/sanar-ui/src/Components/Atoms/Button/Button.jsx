import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import classNames from 'classnames'

const ESButton = ({
    className,
    clear,
    size,
    variant,
    color,
    block,
    children,
    ...props
}) => {
    const classes = classNames('es-button', 'ant-btn', className, {
        [`es-button__${size}`]: size,
        [`es-button__variant--${variant}`]: variant,
        [`${color}`]: color,
        'es-button__block': block
    })

    return (
        <button type='button' className={classes} {...props}>
            <span>{children}</span>
        </button>
    )
}

ESButton.propTypes = Object.assign(
    { ...Button['propTypes'] },
    {
        className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        clear: PropTypes.bool,
        href: PropTypes.string,
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        target: PropTypes.string,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
        type: PropTypes.oneOf(['solid', 'outlined', 'text']),
        color: PropTypes.oneOf(['primary', 'white', 'default'])
    }
)

ESButton.defaultProps = { size: 'medium' }

export default ESButton
