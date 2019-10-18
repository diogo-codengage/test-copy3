import React, { useState, useEffect } from 'react'
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

import { events } from 'Config/Segment'

import resetPassword from './utils/resetPassword'
import { message } from 'antd'

const FLXResetPasswordPage: React.FC<any> = ({ history, location, form }) => {
    const { t } = useTranslation('sanarflix')

    const [loading, setLoading] = useState(false)
    const params = new URLSearchParams(location.search)

    const onSubmit = async event => {
        event.preventDefault()
        setLoading(true)

        try {
            await form.validateFields()

            const { password } = form.getFieldsValue()
            const email = params.get('email')
            const code = params.get('codigo') || ''

            await resetPassword(email, code, password)
            history.push('/auth/signin')
        } catch (error) {
            if (error.message) {
                history.push('/auth/recuperar-senha')
                message.error(error.message)
            }
        }
    }

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('')
        } else {
            callback()
        }
    }

    const validateToNextPassword = (rule, value, callback) => {
        const { passwordConfirm } = form.getFieldsValue()
        if (value && passwordConfirm) {
            form.validateFields(['passwordConfirm'], { force: true })
        }
        callback()
    }

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

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
                            },
                            {
                                validator: validateToNextPassword
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
