import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Rate } from 'antd'

const ESRate = ({ className, ...props }) => {
    const classes = classNames('es-rate', className)
    return <Rate className={classes} {...props} />
}

ESRate.propTypes = {
    className: PropTypes.string,
    allowClear: PropTypes.bool,
    allowHalf: PropTypes.bool,
    autoFocus: PropTypes.bool,
    character: PropTypes.node,
    count: PropTypes.number,
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
    tooltips: PropTypes.array,
    value: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onHoverChange: PropTypes.func,
    onKeyDown: PropTypes.func
}
ESRate.defaultProps = {}

export default ESRate
