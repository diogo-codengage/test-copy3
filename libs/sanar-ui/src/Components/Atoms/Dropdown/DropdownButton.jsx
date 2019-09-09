import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'antd'
import classNames from 'classnames'

const DropdownButton = Dropdown.Button

const ESDropdownButton = ({ className, ...props }) => {
    const classes = classNames('es-dropdown-button', className)

    return <DropdownButton className={classes} {...props} />
}

ESDropdownButton.propTypes = Object.assign(
    { ...DropdownButton['propTypes'] },
    {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        overlay: PropTypes.node,
        trigger: PropTypes.arrayOf(
            PropTypes.oneOf(['click', 'hover', 'contextMenu'])
        ),
        type: PropTypes.string,
        size: PropTypes.string,
        visible: PropTypes.bool,
        onClick: PropTypes.func,
        onVisibleChange: PropTypes.func
    }
)

ESDropdownButton.defaultProps = DropdownButton['defaultProps']

export default ESDropdownButton
