import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'
import { compose } from 'ramda'

import {
    useSnackbarContext,
    SANButton,
    SANForm,
    SANFormItem,
    withSANForm
} from '@sanar/components'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'

import logo from 'Assets/images/brand/logo.svg'
import searching from 'Assets/images/forgot-password/searching.png'

import RMFooter from 'Components/Footer'
import { forgotPassword } from 'Config/AWSCognito'

interface IProps extends RouteComponentProps {
    form: any
}

const FLXSendPasswordRecoveryPage: React.FC<IProps> = ({ form, history }) => {
    const { t } = useTranslation('resmed')
    const createSnackbar = useSnackbarContext()
    const [loading, setLoading] = useState(false)

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const { email } = await form.validateFields()
            await forgotPassword(email)

            history.push({
                pathname: 'recuperar-senha/sucesso',
                search: `?email=${email}`
            })
        } catch (error) {
            if (error.message) {
                createSnackbar({
                    message: error.message,
                    theme: 'error'
                })
            }
        }

        setLoading(false)
    }

    return (
        <>
            <ESPasswordRecoveryTemplate
                title={t('auth.sendPasswordRecovery.title')}
                subtitle={t('auth.sendPasswordRecovery.subtitle')}
                header={<ESBrandHeader logo={logo} />}
                image={searching}
                actionsMargin='large'
                fullHeight={false}
                actions={
                    <SANForm form={form} onSubmit={onSubmit}>
                        <SANFormItem
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
                                    'auth.sendPasswordRecovery.email'
                                )}
                            />
                        </SANFormItem>
                        <SANButton
                            loading={loading}
                            htmlType='submit'
                            uppercase
                            block
                            bold
                            variant='solid'
                            color='primary'
                            className='mb-md'
                        >
                            {t('global.send')}
                        </SANButton>
                        <SANButton
                            href='/#/auth/entrar'
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
            <RMFooter {...{ mt: 'xxl' }} />
        </>
    )
}

const enhance = compose(
    withRouter,
    withSANForm
)

export default enhance(FLXSendPasswordRecoveryPage)
