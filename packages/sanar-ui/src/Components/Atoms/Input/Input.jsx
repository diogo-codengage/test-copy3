import React from 'react'
import PropTypes from 'prop-types'
import Input from 'antd/lib/input'
import classNames from 'classnames'

const ESInput = ({ className, dark, component, ...props }) => {
    const classes = classNames(
        'es-input',
        { 'es-input__dark': dark },
        className
    )

    const Comp = component ? component : Input

    return <Comp className={classes} {...props} />
}

ESInput.propTypes = Object.assign(
    { ...Input['propTypes'] },
    {
        className: PropTypes.string,
        dark: PropTypes.bool
    }
)

ESInput.defaultProps = Input['defaultProps']

ESInput.Password = Input.Password

export default ESInput
