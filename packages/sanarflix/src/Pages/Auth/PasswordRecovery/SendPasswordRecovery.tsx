import React from 'react'
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
import searching from 'Assets/images/searching.png'

const FLXSendPasswordRecoveryPage: React.FC<any> = ({ form }) => {
    const { t } = useTranslation('sanarflix')

    return (
        <ESPasswordRecoveryTemplate
            title={t('auth.sendPasswordRecovery.title')}
            subtitle={t('auth.sendPasswordRecovery.subtitle')}
            header={<ESBrandHeader logo={logo} />}
            image={searching}
            actionsMargin='large'
            actions={
                <ESForm form={form} onSubmit={console.log}>
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
                        loading={false}
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

export default withESForm(FLXSendPasswordRecoveryPage)
