import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import i18n from 'sanar-ui/dist/Config/i18n'

export interface ISANFormComponentProps extends FormComponentProps {}

function withSANForm<T extends ISANFormComponentProps>(
    component,
    options = {}
) {
    const defaultOptions = {
        validateMessages: i18n.t('components:formValidateMessages', {
            returnObjects: true
        })
    }

    if (typeof options === 'function') {
        options = options(defaultOptions)
    }

    return Form.create<T>({
        ...defaultOptions,
        ...options
    })(component)
}

export default withSANForm
