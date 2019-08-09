import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Radio } from 'antd'

const ESRadioButton = forwardRef(({ className, children, ...props }, ref) => {
    const classes = classNames('es-radio-button', className)

    return (
        <Radio.Button className={classes} {...props} ref={ref}>
            {children}
        </Radio.Button>
    )
})

ESRadioButton.propTypes = Object.assign(
    { ...Radio.Button['propTypes'] },
    {
        className: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
)

ESRadioButton.defaultProps = {}

export default ESRadioButton
