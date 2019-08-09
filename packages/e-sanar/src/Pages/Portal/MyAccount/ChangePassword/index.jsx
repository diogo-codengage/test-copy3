import React, { useState } from 'react'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import image from 'assets/images/auth/chest.png'
import ESForm, {
    ESFormItem,
    withESForm
} from 'sanar-ui/dist/Components/Molecules/Form'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { Auth } from 'aws-amplify'

const SANMyAccountChangePassword = ({ history, form }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const changePassword = event => {
        event.preventDefault()
        setLoading(true)

        form.validateFields()
            .then(() => {
                const { currentPassword, password } = form.getFieldsValue()

                Auth.currentAuthenticatedUser()
                    .then(user => {
                        return Auth.changePassword(
                            user,
                            currentPassword,
                            password
                        )
                    })
                    .then(() => {
                        setLoading(false)
                        message.success(t('esanar:auth.messageChangeSuccess'))
                        history.goBack()
                    })
                    .catch(({ code }) => {
                        setLoading(false)
                        switch (code) {
                            case '':
                                message.error(
                                    t(
                                        'A senha atual não confere com a cadastrada em nossos registros.'
                                    )
                                )
                                break
                            default:
                                message.error(
                                    t('Ocorreu um erro ao redefinir a senha.')
                                )
                        }
                    })
            })
            .catch(() => {
                setLoading(false)
            })
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
            brandHeader={false}
            title={t('esanar:auth.sendResetPassword.title')}
            subtitle={t('esanar:auth.sendResetPassword.subtitle')}
            image={image}
            actionsMargin='large'
            fullHeight={false}
            actions={
                <ESForm form={form} onSubmit={changePassword}>
                    <ESFormItem
                        name='currentPassword'
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            },
                            {
                                min: 6,
                                message: t(
                                    'esanar:auth.validations.minPassword',
                                    {
                                        min: 6
                                    }
                                )
                            }
                        ]}
                    >
                        <ESInput
                            size='large'
                            component={ESInput.Password}
                            placeholder={t('esanar:auth.currentPassword')}
                        />
                    </ESFormItem>
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
                                message: t(
                                    'esanar:auth.validations.minPassword',
                                    {
                                        min: 6
                                    }
                                )
                            }
                        ]}
                    >
                        <ESInput
                            size='large'
                            component={ESInput.Password}
                            placeholder={t('esanar:auth.newPassword')}
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
                                    'esanar:auth.validations.passwordsMismatch'
                                )
                            }
                        ]}
                    >
                        <ESInput
                            size='large'
                            component={ESInput.Password}
                            placeholder={t(
                                'esanar:auth.sendResetPassword.confirmPassword'
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
                        {t('esanar:global.confirm')}
                    </ESButton>
                </ESForm>
            }
        />
    )
}

export default withESForm(SANMyAccountChangePassword)
