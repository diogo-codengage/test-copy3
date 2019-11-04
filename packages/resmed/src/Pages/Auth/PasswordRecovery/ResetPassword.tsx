import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'
import { compose } from 'ramda'

import { useSnackbarContext, SANButton } from '@sanar/components'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'
import ESForm, {
    ESFormItem,
    withESForm
} from 'sanar-ui/dist/Components/Molecules/Form'

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
    const { t } = useTranslation('resmed')
    const createSnackbar = useSnackbarContext()
    const [loading, setLoading] = useState(false)
    const params = new URLSearchParams(location.search)

    const onSubmit = event => {
        event.preventDefault()
        setLoading(true)

        form.validateFields(async (err, { password }) => {
            if (!err) {
                try {
                    const verificationCode = params.get('codigo') || ''
                    const email = params.get('email') || ''

                    await resetPassword({
                        verificationCode,
                        newPassword: password,
                        email
                    })
                    createSnackbar({
                        message: t('auth.sendResetPassword.success'),
                        theme: 'success'
                    })
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
        })

        setLoading(false)
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
                        </ESFormItem>

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
                    </ESForm>
                }
            />
            <RMFooter mt='xxl' />
        </>
    )
}

const enhance = compose(
    withRouter,
    withESForm
)

export default enhance(FLXResetPasswordPage)
