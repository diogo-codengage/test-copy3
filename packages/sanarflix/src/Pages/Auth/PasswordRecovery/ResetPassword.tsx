import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESForm, {
    ESFormItem,
    withESForm
} from 'sanar-ui/dist/Components/Molecules/Form'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'

import logo from 'Assets/images/brand/logo.svg'
import image from 'Assets/images/chest.png'

import resetPassword from './utils/resetPassword'
import { message } from 'antd'

const FLXResetPasswordPage: React.FC<any> = ({ history, location, form }) => {
    const { t } = useTranslation('sanarflix')

    const [loading, setLoading] = useState(false)
    const params = new URLSearchParams(location.search)

    const onSubmit = event => {
        event.preventDefault()
        setLoading(true)

        form.validateFields()
            .then(() => {
                const { password } = form.getFieldsValue()
                const email = params.get('email')
                const code = params.get('codigo') || ''

                resetPassword(email, code, password)
                    .then(() => {
                        setLoading(false)
                        history.push('/auth/signin')
                    })
                    .catch(error => {
                        setLoading(false)
                        history.push('/auth/recuperar-senha')
                        message.error(error.message)
                    })
            })
            .catch(() => setLoading(false))
    }

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }

    return (
        <ESPasswordRecoveryTemplate
            title={t('auth.sendResetPassword.title')}
            subtitle={t('auth.sendResetPassword.subtitle')}
            image={image}
            header={<ESBrandHeader logo={logo} />}
            actionsMargin='large'
            actions={
                <ESForm form={form} onSubmit={onSubmit}>
                    <ESFormItem
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            },
                            {
                                min: 6,
                                message: t('auth.validations.minPassword', {
                                    min: 6
                                })
                            }
                        ]}
                    >
                        <ESInput
                            size='large'
                            component={ESInput.Password}
                            placeholder={t('auth.newPassword')}
                        />
                    </ESFormItem>
                    <ESFormItem
                        name='passwordConfirm'
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            },
                            {
                                validator: compareToFirstPassword,
                                message: t('auth.validations.passwordsMismatch')
                            }
                        ]}
                    >
                        <ESInput
                            size='large'
                            component={ESInput.Password}
                            placeholder={t(
                                'auth.sendResetPassword.confirmPassword'
                            )}
                        />
                    </ESFormItem>

                    <ESButton
                        htmlType='submit'
                        uppercase
                        block
                        variant='solid'
                        color='primary'
                        className='mb-md'
                        loading={loading}
                    >
                        {t('global.send')}
                    </ESButton>
                    <ESButton
                        onClick={() => history.push('/')}
                        uppercase
                        block
                        variant='text'
                        color='primary'
                    >
                        {t('auth.accessAccount')}
                    </ESButton>
                </ESForm>
            }
        />
    )
}

export default withESForm(FLXResetPasswordPage)
