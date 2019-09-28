import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Select } from 'antd'
import ESEvaIcon from '../EvaIcon'

const ESSelect = forwardRef(({ className, suffixIcon, ...props }, ref) => {
    const classes = classNames('es-select', className)
    const icon = suffixIcon ? (
        suffixIcon
    ) : (
        <ESEvaIcon name='chevron-down-outline' />
    )

    return <Select dropdownClassName='es-select--dropdown' ref={ref} suffixIcon={icon} className={classes} {...props} />
})

ESSelect.propTypes = Object.assign(
    {
        ...Select['propTypes']
    },
    {
        className: PropTypes.string
    }
)
ESSelect.defaultProps = {}

export default ESSelect
