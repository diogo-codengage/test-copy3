import React, { useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Form } from 'antd'
import i18n from '../../../Config/i18n'

import { withFormProvider, useFormContext } from './context'

const ESForm = ({ className, form, ...props }) => {
    const classes = classNames('es-form', className)
    const { setForm } = useFormContext()

    useEffect(() => setForm(form), [])

    return <Form className={classes} {...props} />
}

ESForm.propTypes = Object.assign(
    {
        ...Form['propTypes']
    },
    {
        className: PropTypes.string,
        form: PropTypes.object.isRequired
    }
)

ESForm.defaultProps = {}

export default withFormProvider(ESForm)
