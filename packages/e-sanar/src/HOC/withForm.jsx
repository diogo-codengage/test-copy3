import { withESForm } from 'sanar-ui/dist/Components/Molecules/Form'

import i18n from 'Config/i18n'

export const withForm = (component, options = {}) => {
    const defaultOptions = {
        validateMessages: i18n.t('formValidateMessages', {
            returnObjects: true
        })
    }

    if (typeof options === 'function') {
        options = options(defaultOptions)
    }

    return withESForm({
        ...defaultOptions,
        ...options
    })(component)
}
