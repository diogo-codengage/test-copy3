import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'antd'
import classNames from 'classnames'

type Iprop = PropTypes.InferProps<typeof propTypes>

const ESDropdownButton: React.FC<Iprop> = ({ className, ...props }) => {
    const classes = classNames('es-dropdown-button', className)

    return <Dropdown.Button className={classes} {...props} overlay={propTypes.any}/>
}

const propTypes = Object.assign(
    { ...Dropdown['propTypes'] },
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

ESDropdownButton.propTypes = propTypes

ESDropdownButton.defaultProps = Dropdown['defaultProps']

export default ESDropdownButton
