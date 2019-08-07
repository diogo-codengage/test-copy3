import React from 'react'
import { useTranslation } from 'react-i18next'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'

import logo from 'Assets/images/brand/logo.svg'
import image from 'Assets/images/mail.png'

const FLXPasswordRecoverySent: React.FC<any> = ({ location, history }) => {
    const { t } = useTranslation('sanarflix')
    const params = new URLSearchParams(location.search)

    return (
        <ESPasswordRecoveryTemplate
            title={t('auth.passwordResetSent.title')}
            subtitle={t('auth.passwordResetSent.subtitle')}
            image={image}
            header={<ESBrandHeader logo={logo} />}
            actions={
                <>
                    <ESTypography className='mb-md' level={6}>
                        {params.get('email')}
                    </ESTypography>
                    <ESTypography variant='subtitle2' className='mb-md'>
                        {t('auth.passwordResetSent.advice')}
                    </ESTypography>
                    <ESButton
                        onClick={() => history.push('/')}
                        uppercase
                        block
                        variant='solid'
                        color='primary'
                    >
                        {t('auth.accessAccount')}
                    </ESButton>
                </>
            }
        />
    )
}

export default FLXPasswordRecoverySent
