import React, { useState, useEffect } from 'react'
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

import { events } from 'Config/Segment'

import forgotPassword from './utils/forgotPassword'

import searching from 'Assets/images/searching.png'

const FLXSendPasswordRecoveryPage: React.FC<any> = ({ form, history }) => {
    const { t } = useTranslation('sanarflix')
    const [loading, setLoading] = useState(false)

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const { email } = form.getFieldsValue()

        try {
            await form.validateFields()
            await forgotPassword(email.trim().toLowerCase())

            history.push({
                pathname: 'recuperar-senha/sucesso',
                search: `?email=${email}`
            })
        } catch (error) {
            if (error.message) message.error(error.message)
        }

        setLoading(false)
    }

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

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
