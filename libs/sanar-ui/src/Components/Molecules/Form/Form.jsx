import React, { useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Form } from 'antd'

import { withFormProvider, useFormContext } from './context'

const ESForm = ({
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

    return <Form className={classes} {...props} />
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
