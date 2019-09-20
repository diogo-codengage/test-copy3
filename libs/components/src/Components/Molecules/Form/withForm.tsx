import React from 'react'

import { Form } from 'antd'
import i18n from 'sanar-ui/dist/Config/i18n'

const withSANForm = (component, options = {}) => {
    const defaultOptions = {
        validateMessages: i18n.t('sanarui:formValidateMessages', {
            returnObjects: true
        })
    }

    if (typeof options === 'function') {
        options = options(defaultOptions)
    }

    return Form.create({
        ...defaultOptions,
        ...options
    })(component)
}

export default withSANForm
