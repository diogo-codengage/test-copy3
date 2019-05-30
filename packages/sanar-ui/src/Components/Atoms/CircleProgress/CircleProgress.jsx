import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Progress } from 'antd'

const ESCircleProgress = ({ className, ...props }) => {
    const classes = classNames('es-circle-progress', className)
    return <Progress className={classes} type='circle' {...props} />
}

ESCircleProgress.propTypes = {
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
    width: PropTypes.number,
    percent: PropTypes.number,
    successPercent: PropTypes.number,
    showInfo: PropTypes.bool,
    format: PropTypes.func,
    status: PropTypes.oneOf([
        'normal',
        'exception',
        'active',
        'success',
        'warning'
    ])
}
ESCircleProgress.defaultProps = {
    strokeWidth: 6
}

export default ESCircleProgress
