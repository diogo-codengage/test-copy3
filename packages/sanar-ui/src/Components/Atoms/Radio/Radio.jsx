import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Radio } from 'antd'

const ESRadio = ({ className, children, ...props }) => {
    const classes = classNames('es-radio', className)
    return (
        <Radio className={classes} {...props}>
            {children}
        </Radio>
    )
}

ESRadio.propTypes = Object.assign(
    { ...Radio['propTypes'] },
    {
        className: PropTypes.string
    }
)

ESRadio.defaultProps = {}

export default ESRadio
