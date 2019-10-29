import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANLayoutFooter,
    ISANLayoutFooterProps,
    SANSpace,
    SANFlexbox,
    SANTypography,
    SANButton,
    SANBox
} from '@sanar/components'

import logoFooter from 'Assets/images/brand/logo-grey.svg'

const ButtonAbout = props => (
    <SANButton bold size='xsmall' color={'primary'} variant='text' {...props} />
)

const Copyright = () => {
    const { t } = useTranslation('resmed')
    return (
        <SANSpace p={24}>
            <SANFlexbox
                flexWrap='wrap'
                alignItems='center'
                justifyContent='center'
                color={'grey.5'}
            >
                <SANTypography
                    color={'grey.5'}
                    textAlign='center'
                    variant='caption'
                >
                    Copyright © Residência Médica. {t('global.copyright')}.
                </SANTypography>
                <ButtonAbout>{t('global.termsOfUse')}</ButtonAbout> |{' '}
                <ButtonAbout>{t('global.privacyPolicy')}</ButtonAbout>
            </SANFlexbox>
        </SANSpace>
    )
}

export const defaultFooterProps: ISANLayoutFooterProps = {
    logo: logoFooter,
    phone: '0800 327-0035',
    email: 'atendimento@editorasanar.com.br',
    copyright: <Copyright />,
    attendance: 'Atendimento de Seg. a Sex. das 09h às 18h',
    HelpButton: {
        onClick: () => console.log('HelpButton')
    }
}

const RMFooter = props => {
    const customProps: ISANLayoutFooterProps = {
        ...defaultFooterProps,
        ...props
    }
    return (
        <SANBox width='100vw'>
            <SANLayoutFooter {...customProps} />
        </SANBox>
    )
}

export default RMFooter
