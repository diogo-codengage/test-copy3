import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Radio } from 'antd'

const ESRadioButton = ({ className, children, ...props }) => {
    const classes = classNames('es-radio-button', className)

    return (
        <Radio.Button className={classes} {...props}>
            {children}
        </Radio.Button>
    )
}

ESRadioButton.propTypes = Object.assign(
    { ...Radio.Button['propTypes'] },
    {
        className: PropTypes.string
    }
)

ESRadioButton.defaultProps = {}

export default ESRadioButton