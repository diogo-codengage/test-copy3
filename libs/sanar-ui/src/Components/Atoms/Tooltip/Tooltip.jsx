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

ESTooltip.propTypes = Object.assign(
    { ...Tooltip['propTypes'] },
    {
        className: PropTypes.string,
        arrowPointAtCenter: PropTypes.bool,
        defaultVisible: PropTypes.bool,
        visible: PropTypes.bool,
        trigger: PropTypes.oneOf(['hover', 'focus', 'click', 'contextMenu']),
        placement: PropTypes.oneOf([
            'top',
            'left',
            'right',
            'bottom',
            'topLeft',
            'topRight',
            'bottomLeft',
            'bottomRight',
            'leftTop',
            'leftBottom',
            'rightTop',
            'rightBottom'
        ])
    }
)

ESTooltip.defaultProps = Tooltip['defaultProps']

export default ESTooltip
