import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'

const ESTooltip = ({ className, children, ...props }) => {
    const classes = classNames('es-tooltip', className)
    return (
        <Tooltip
            overlayClassName='es-tooltip__overlay'
            {...props}
            className={classes}
        >
            {children}
        </Tooltip>
    )
}

ESTooltip.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    placement: PropTypes.string,
    title: PropTypes.string
}
ESTooltip.defaultProps = {}

export default ESTooltip
