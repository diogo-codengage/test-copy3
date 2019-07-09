import React, { useState } from 'react'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESForm, {
    ESFormItem,
    withESForm
} from 'sanar-ui/dist/Components/Molecules/Form'

import image from 'assets/images/auth/chest.png'
import { esSendPasswordReset } from 'sanar-ui/dist/Util/Auth'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

const SANCreatePassword = ({ history, location, form }) => {
    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)
    const params = new URLSearchParams(location.search)

    const resetPassword = event => {
        event.preventDefault()

        form.validateFields()
            .then(() => {
                const { password } = form.getFieldsValue()
                setLoading(true)
                esSendPasswordReset(
                    password,
                    params.get('email'),
                    params.get('codigo')
                )
                    .then(res => {
                        message.success(res.message)
                        setLoading(false)
                        history.push('/auth/signin')
                    })
                    .catch(error => {
                        message.error(error.message)
                        history.push('../recuperar-senha')
                        setLoading(false)
                    })
            })
            .catch(err => console.log(err))
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
            title={t('esanar:auth.createNewPassword.title')}
            subtitle={t('esanar:auth.sendResetPassword.subtitle')}
            image={image}
            actionsMargin='large'
            actions={
                <ESForm form={form} onSubmit={resetPassword}>
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
                        {t('esanar:auth:createNewPassword.button')}
                    </ESButton>
                    <ESButton
                        onClick={() => history.push('/')}
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

export default withESForm(SANCreatePassword)
