import React from 'react'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import image from 'assets/images/auth/mail.png'
import { useTranslation } from 'react-i18next'

const SANPasswordRecoverySent = ({ location, history }) => {
    const { t } = useTranslation()
    const params = new URLSearchParams(location.search)

    return (
        <div className='san-password-recovery__success'>
            <ESPasswordRecoveryTemplate
                title={t('esanar:auth.passwordResetSent.title')}
                subtitle={t('esanar:auth.passwordResetSent.subtitle')}
                image={image}
                actions={
                    <>
                        <ESTypography
                            className='san-password-recovery__success--email'
                            level={6}
                        >
                            {params.get('email')}
                        </ESTypography>
                        <ESTypography
                            variant='subtitle2'
                            className='san-password-recovery__success--info'
                        >
                            {t('esanar:auth.passwordResetSent.advice')}
                        </ESTypography>
                        <ESButton
                            onClick={() => history.push('/')}
                            uppercase
                            block
                            variant='solid'
                            color='primary'
                        >
                            {t('esanar:auth.accessAccount')}
                        </ESButton>
                    </>
                }
            />
        </div>
    )
}

export default SANPasswordRecoverySent
