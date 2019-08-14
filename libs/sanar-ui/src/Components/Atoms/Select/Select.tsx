import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { Select } from 'antd'
import ESEvaIcon from '../EvaIcon'

const ESSelect = forwardRef(({ className, suffixIcon, ...props }: any, ref: any) => {
    const classes = classNames('es-select', className)
    const icon = suffixIcon ? (
        suffixIcon
    ) : (
        <ESEvaIcon name='chevron-down-outline' />
    )

    return <Select ref={ref} suffixIcon={icon} className={classes} {...props} />
})

ESSelect.defaultProps = {}

export default ESSelect
