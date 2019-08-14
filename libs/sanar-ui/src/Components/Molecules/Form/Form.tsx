import React, { useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESButton from '../../Atoms/Button'

import { Form } from 'antd'

import { withFormProvider, useFormContext } from './context'

const ESForm: React.FC<any>  = ({
    className,
    form,
    customValidator,
    disableWhenInvalid,
    ...props
}) => {
    const classes = classNames('es-form', className)
    const { setForm } = useFormContext()

    useEffect(() => {
        setForm(form)
    }, [])

    const invalidForm = () => {
        return (
            customValidator ||
            !form.isFieldsTouched() ||
            form.isFieldTouched() ||
            Object.keys(form.getFieldsError()).some(
                field => form.getFieldsError()[field]
            )
        )
    }

    let kids = React.Children.map(props.children, Item => {
        return Item.type === ESButton &&
            Item.props.htmlType === 'submit' &&
            disableWhenInvalid ? (
            <Item.type {...Item.props} disabled={invalidForm()} />
        ) : (
            Item
        )
    })

    return (
        <Form className={classes} {...props}>
            {kids}
        </Form>
    )
}

ESForm.propTypes = Object.assign(
    {
        ...Form['propTypes']
    },
    {
        className: PropTypes.string,
        form: PropTypes.object.isRequired,
        customValidator: PropTypes.bool
    }
)

ESForm.defaultProps = {
    customValidator: false
}

export default withFormProvider(ESForm)
