import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Progress } from 'antd'

const ESCircleProgress = ({ className, status, format, ...props }) => {
    const classes = classNames(
        'es-circle-progress',
        [`es-circle-progress--${status}`],
        className
    )
    const customFormat = format ? format : percent => `${parseInt(percent)}%`
    return (
        <Progress
            format={customFormat}
            className={classes}
            type='circle'
            {...props}
        />
    )
}

ESCircleProgress.propTypes = {
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
    width: PropTypes.number,
    percent: PropTypes.number,
    successPercent: PropTypes.number,
    showInfo: PropTypes.bool,
    format: PropTypes.func,
    strokeLinecap: PropTypes.oneOf(['round', 'square']),
    status: PropTypes.oneOf(['normal', 'error', 'success'])
}
ESCircleProgress.defaultProps = {
    strokeWidth: 6,
    strokeLinecap: 'square',
    status: 'normal'
}

export default ESCircleProgress
