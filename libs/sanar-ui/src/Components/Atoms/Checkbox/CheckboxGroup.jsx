import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'antd/lib/checkbox'
import classNames from 'classnames'

const ESCheckboxGroup = forwardRef(({ className, ...props }, ref) => {
    const classes = classNames('es-checkbox-group', className)

    return <Checkbox.Group ref={ref} className={classes} {...props} />
})

ESCheckboxGroup.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    options: PropTypes.array
}

ESCheckboxGroup.defaultProps = {}

export default ESCheckboxGroup
