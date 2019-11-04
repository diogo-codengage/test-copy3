import React from 'react'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'

import { SANButton, SANTypography } from '@sanar/components'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'

import RMFooter from 'Components/Footer'

import logo from 'Assets/images/brand/logo.svg'
import image from 'Assets/images/forgot-password/mail.png'

const FLXPasswordRecoverySent: React.FC<RouteComponentProps> = ({
    location,
    history
}) => {
    const { t } = useTranslation('resmed')
    const params = new URLSearchParams(location.search)

    return (
        <>
            <ESPasswordRecoveryTemplate
                title={t('auth.passwordResetSent.title')}
                subtitle={t('auth.passwordResetSent.subtitle')}
                image={image}
                header={<ESBrandHeader logo={logo} />}
                fullHeight={false}
                actions={
                    <>
                        <SANTypography mb='md' level={6}>
                            {params.get('email')}
                        </SANTypography>
                        <SANTypography
                            variant='subtitle2'
                            mb='md'
                            color='gold.3'
                        >
                            {t('auth.passwordResetSent.advice')}
                        </SANTypography>
                        <SANButton
                            onClick={() => history.push('/auth/entrar')}
                            uppercase
                            block
                            bold
                            variant='solid'
                            color='primary'
                        >
                            {t('auth.accessAccount')}
                        </SANButton>
                    </>
                }
            />
            <RMFooter {...{ mt: 'xxl' }} />
        </>
    )
}

export default withRouter(FLXPasswordRecoverySent)
