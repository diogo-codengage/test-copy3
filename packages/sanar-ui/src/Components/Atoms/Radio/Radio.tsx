import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Radio } from 'antd'

const ESRadio = ({ className, ...props }, ref) => {
    const classes = classNames('es-radio', className)
    return <Radio className={classes} {...props} />
}

ESRadio.propTypes = Object.assign(
    { ...Radio['propTypes'] },
    {
        className: PropTypes.string
    }
)

ESRadio.defaultProps = {}

export default forwardRef(ESRadio)
