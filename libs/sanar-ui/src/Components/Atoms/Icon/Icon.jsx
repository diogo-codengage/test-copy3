import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'antd/lib/icon'
import classNames from 'classnames'

const ESIcon = ({ className, fontSize, style, color, ...props }) => {
    const classes = classNames('es-icon', className, {
        [`text-${color}`]: color
    })

    return (
        <Icon className={classes} {...props} style={{ ...style, fontSize }} />
    )
}

ESIcon.propTypes = Object.assign(
    { ...Icon['propTypes'] },
    {
        className: PropTypes.string,
        style: PropTypes.any,
        fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        theme: PropTypes.oneOf(['filled', 'outlined', 'twoTone']),
        spin: PropTypes.bool,
        rotate: PropTypes.number,
        component: PropTypes.func,
        twoToneColor: PropTypes.string
    }
)

ESIcon.defaultProps = Icon['defaultProps']

export default ESIcon
