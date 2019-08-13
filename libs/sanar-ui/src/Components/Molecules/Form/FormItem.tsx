import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Form } from 'antd'

import { useFormContext } from './context'

const ESFormItem =
    ({ className, children, name, ...props }, ref) => {
        const {
            form: { getFieldDecorator }
        } = useFormContext() as any
        const classes = classNames('es-form-item', className)

        return (
            <Form.Item className={classes} {...props} ref={ref}>
                {getFieldDecorator && name
                    ? getFieldDecorator(name, props)(children)
                    : children}
            </Form.Item>
        )
    }


ESFormItem.propTypes = Object.assign(
    {
        ...Form.Item['propTypes']
    },
    {
        className: PropTypes.string
    }
)

ESFormItem.defaultProps = {}

export default forwardRef(ESFormItem)
