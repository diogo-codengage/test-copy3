import React from 'react'
import PropTypes from 'prop-types'
import Input from 'antd/lib/input'
import classNames from 'classnames'

const ESInput = ({ className, component, ...props }) => {
    const classes = classNames('es-input', className)

    const Comp = component ? component : Input

    return <Comp className={classes} {...props} />
}

ESInput.propTypes = Object.assign(
    { ...Input['propTypes'] },
    {
        className: PropTypes.string
    }
)

ESInput.defaultProps = Input['defaultProps']

ESInput.Password = Input.Password

export default ESInput
