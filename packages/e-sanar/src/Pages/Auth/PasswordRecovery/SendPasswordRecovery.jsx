import React, { useState } from 'react'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import image from 'assets/images/auth/searching.png'
import ESForm, {
    ESFormItem,
    withESForm
} from 'sanar-ui/dist/Components/Molecules/Form'
import { esSendPasswordRecovery } from 'sanar-ui/dist/Util/Auth'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

const SANSendPasswordRecovery = ({ history, form }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const forgotPassword = event => {
        event.preventDefault()
        setLoading(true)

        form.validateFields()
            .then(() => {
                const { email } = form.getFieldsValue()

                esSendPasswordRecovery(email)
                    .then(() => {
                        setLoading(false)
                        history.push({
                            pathname: 'recuperar-senha/sucesso',
                            search: `?email=${email}`
                        })
                    })
                    .catch(error => {
                        message.error(error.message)
                        setLoading(false)
                    })
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <ESPasswordRecoveryTemplate
            title={t('esanar:auth.sendPasswordRecovery.title')}
            subtitle={t('esanar:auth.sendPasswordRecovery.subtitle')}
            image={image}
            actionsMargin='large'
            actions={
                <ESForm form={form} onSubmit={forgotPassword}>
                    <ESFormItem
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            },
                            {
                                type: 'email',
                                message: t(
                                    'sanarui:formValidateMessages.types.email'
                                )
                            }
                        ]}
                        name='email'
                    >
                        <ESInput
                            size='large'
                            placeholder={t(
                                'esanar:auth.sendPasswordRecovery.email'
                            )}
                        />
                    </ESFormItem>
                    <ESButton
                        loading={loading}
                        htmlType='submit'
                        uppercase
                        block
                        variant='solid'
                        color='primary'
                        className='mb-md'
                    >
                        {t('esanar:global.send')}
                    </ESButton>
                    <ESButton
                        href='/#/auth/signin'
                        uppercase
                        block
                        variant='text'
                        color='primary'
                    >
                        {t('esanar:auth.accessAccount')}
                    </ESButton>
                </ESForm>
            }
        />
    )
}

export default withESForm(SANSendPasswordRecovery)
