import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'
import { compose } from 'ramda'

import {
    useSnackbarContext,
    SANForm,
    SANFormItem,
    withSANForm,
    SANButton
} from '@sanar/components'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'

import logo from 'Assets/images/brand/logo.svg'
import image from 'Assets/images/forgot-password/chest.png'

import RMFooter from 'Components/Footer'
import { resetPassword } from 'Config/AWSCognito'

interface IProps extends RouteComponentProps {
    form: any
}

const FLXResetPasswordPage: React.FC<IProps> = ({
    history,
    location,
    form
}) => {
    const { t } = useTranslation('sanarflix')
    const createSnackbar = useSnackbarContext()
    const [loading, setLoading] = useState(false)
    const params = new URLSearchParams(location.search)

    const onSubmit = async event => {
        event.preventDefault()
        setLoading(true)

        try {
            const { password } = await form.validateFields()

            const verificationCode = params.get('codigo') || ''

            await resetPassword({ verificationCode, newPassword: password })
            history.push('/auth/entrar')
        } catch (error) {
            if (error.message) {
                history.push('/auth/recuperar-senha')
                createSnackbar({
                    message: error.message,
                    theme: 'error'
                })
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

    return (
        <>
            <ESPasswordRecoveryTemplate
                title={t('auth.sendResetPassword.title')}
                subtitle={t('auth.sendResetPassword.subtitle')}
                image={image}
                header={<ESBrandHeader logo={logo} />}
                actionsMargin='large'
                fullHeight={false}
                actions={
                    <SANForm form={form} onSubmit={onSubmit}>
                        <SANFormItem
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
                        </SANFormItem>
                        <SANFormItem
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
                                    message: t(
                                        'auth.validations.passwordsMismatch'
                                    )
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
                        </SANFormItem>

                        <SANButton
                            htmlType='submit'
                            uppercase
                            block
                            bold
                            variant='solid'
                            color='primary'
                            className='mb-md'
                            loading={loading}
                        >
                            {t('global.send')}
                        </SANButton>
                        <SANButton
                            onClick={() => history.push('/')}
                            uppercase
                            block
                            bold
                            variant='text'
                            color='primary'
                        >
                            {t('auth.accessAccount')}
                        </SANButton>
                    </SANForm>
                }
            />
            <RMFooter mt='xxl' />
        </>
    )
}

const enhance = compose(
    withRouter,
    withSANForm
)

export default enhance(FLXResetPasswordPage)
