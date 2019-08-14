import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Switch from 'antd/lib/switch'
import classNames from 'classnames'

import ESIcon from '../Icon'

const ESSwitch = forwardRef(({ className, checkedChildren, ...props }, ref) => {
    const classes = classNames('es-switch', className)

    const icon = checkedChildren ? checkedChildren : <ESIcon type='check' />

    return (
        <Switch
            ref={ref}
            checkedChildren={icon}
            className={classes}
            {...props}
        />
    )
})

ESSwitch.propTypes = Object.assign(
    { ...Switch['propTypes'] },
    {
        className: PropTypes.string,
        autoFocus: PropTypes.bool,
        checked: PropTypes.bool,
        checkedChildren: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]),
        unCheckedChildren: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]),
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        size: PropTypes.oneOf(['default', 'small']),
        onChange: PropTypes.func,
        onClick: PropTypes.func
    }
)

ESSwitch.defaultProps = Switch['defaultProps']

export default ESSwitch
