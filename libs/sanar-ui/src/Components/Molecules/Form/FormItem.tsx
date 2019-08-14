import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { Form } from 'antd'

import { useFormContext } from './context'

const ESFormItem  = forwardRef(
    ({ className, children, name, ...props }: any, ref) => {
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
)


export default ESFormItem
