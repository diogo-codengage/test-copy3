import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Form } from 'antd'

import { useFormContext } from './context'

const ESFormItem = ({ className, children, name, ...props }) => {
    const {
        form: { getFieldDecorator }
    } = useFormContext()
    const classes = classNames('es-form', className)

    return (
        <Form.Item className={classes} {...props}>
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

export default ESFormItem
