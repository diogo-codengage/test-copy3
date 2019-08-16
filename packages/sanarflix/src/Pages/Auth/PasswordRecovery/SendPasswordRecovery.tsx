import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESForm, {
    ESFormItem,
    withESForm
} from 'sanar-ui/dist/Components/Molecules/Form'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'

import logo from 'Assets/images/brand/logo.svg'
import { withRouter } from 'react-router'
import { message } from 'antd'

import forgotPassword from './utils/forgotPassword'

import searching from 'Assets/images/searching.png'

const FLXSendPasswordRecoveryPage: React.FC<any> = ({ form, history }) => {
    const { t } = useTranslation('sanarflix')
    const [loading, setLoading] = useState(false)

    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)
        const { email } = form.getFieldsValue()

        forgotPassword(email)
            .then(() => {
                history.push({
                    pathname: 'recuperar-senha/sucesso',
                    search: `?email=${email}`
                })
                setLoading(false)
            })
            .catch(error => {
                message.error(error.message)
                setLoading(false)
            })
    }

    return (
        <ESPasswordRecoveryTemplate
            title={t('auth.sendPasswordRecovery.title')}
            subtitle={t('auth.sendPasswordRecovery.subtitle')}
            header={<ESBrandHeader logo={logo} />}
            image={searching}
            actionsMargin='large'
            actions={
                <ESForm form={form} onSubmit={onSubmit}>
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
                            placeholder={t('auth.sendPasswordRecovery.email')}
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
                        {t('global.send')}
                    </ESButton>
                    <ESButton
                        href='/#/auth/signin'
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

export default withESForm(withRouter(FLXSendPasswordRecoveryPage))
