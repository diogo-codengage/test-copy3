import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Progress } from 'antd'

const ESCircleProgress: React.FC<IProps>=({
    className,
    status,
    format,
    color,
    trailColor,
    ...props
}) => {
    const classes = classNames(
        'es-circle-progress',
        [`es-circle-progress--${status}`],
        [`es-circle-progress--${color}`],
        className,
        {
            'es-circle-progress--trail--grey': trailColor === 'grey'
        }
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

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign({
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
    width: PropTypes.number,
    percent: PropTypes.number,
    successPercent: PropTypes.number,
    showInfo: PropTypes.bool,
    format: PropTypes.func,
    strokeLinecap: PropTypes.oneOf(['round', 'square']),
    color: PropTypes.oneOf(['white']),
    status: PropTypes.oneOf(['normal', 'error', 'success', 'warning']),
    trailColor: PropTypes.oneOf(['grey'])
})
ESCircleProgress.defaultProps = {
    strokeWidth: 6,
    strokeLinecap: 'square',
    status: 'normal'
}

ESCircleProgress.propTypes = propTypes
export default ESCircleProgress
