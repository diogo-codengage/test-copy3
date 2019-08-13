import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Radio } from 'antd'

const ESRadioGroup =
    ({ className, children, blocks, ...props }, ref) => {
        const classes = classNames('es-radio-group', className, {
            'es-radio-group--blocks': blocks
        })

        return (
            <Radio.Group className={classes} {...props} ref={ref}>
                {children}
            </Radio.Group>
        )
    }


ESRadioGroup.propTypes = Object.assign(
    { ...Radio.Group['propTypes'] },
    {
        className: PropTypes.string
    }
)
ESRadioGroup.defaultProps = {}

export default forwardRef(ESRadioGroup)
