import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Input from 'antd/lib/input'
import classNames from 'classnames'

import warning from '../../../Util/Warning'

const ESInput = ({ className, component, ...props }) => {
    const classes = classNames('es-input', className)

    const Comp = component ? component : Input

    useEffect(() => {
        warning(
            false,
            'ESInput',
            'ESInput component is deprecated. Please use SInput component.'
        )
    }, [])

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
