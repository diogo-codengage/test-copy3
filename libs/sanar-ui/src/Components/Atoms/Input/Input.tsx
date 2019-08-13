import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Input from 'antd/lib/input'
import classNames from 'classnames'

import warning from '../../../Util/Warning'

type IProps = PropTypes.InferProps<typeof propTypes>

const ESInput: React.FC<IProps & any> = ({ className, dark, component, ...props }) => {
    const classes = classNames(
        'es-input',
        { 'es-input__dark': dark },
        className
    )

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

const propTypes = Object.assign(
    { ...Input['propTypes'] },
    {
        className: PropTypes.string,
        dark: PropTypes.bool,
        component: PropTypes.any,
        placeholder: PropTypes.any,
    }
)

ESInput.propTypes = propTypes

ESInput.defaultProps = Input['defaultProps']

// @ts-ignore
ESInput.Password = Input.Password

export default ESInput as (React.FC<any> & {Password: any})
