import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'

import {
    SANLayoutFooter,
    SANSpace,
    SANFlexbox,
    SANTypography,
    SANButton,
    SANBox
} from '@sanar/components'
import { ISANLayoutFooterProps } from '@sanar/components/dist/Components/Organisms/Layout'

import RMModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'

import logoFooter from 'Assets/images/brand/logo-grey.svg'

const ButtonAbout = props => (
    <SANButton bold size='xsmall' color={'primary'} variant='text' {...props} />
)

const Copyright = ({ darkMode }) => {
    const { t } = useTranslation('resmed')
    const [showModalTerms, setShowModalTerms] = useState(false)
    const [activeKey, setActiveKey] = useState(0)

    const modalTermsOpen = defaultKey => {
        setActiveKey(defaultKey)
        setShowModalTerms(true)
    }
    return (
        <>
            <SANSpace p={24}>
                <SANFlexbox
                    flexWrap='wrap'
                    alignItems='center'
                    justifyContent='center'
                    color={darkMode ? 'white.6' : 'grey.5'}
                >
                    <SANTypography
                        color={darkMode ? 'white.5' : 'grey.5'}
                        textAlign='center'
                        variant='caption'
                    >
                        Copyright © Residência Médica. {t('global.copyright')}.
                    </SANTypography>
                    <ButtonAbout
                        darkMode={darkMode}
                        onClick={() => modalTermsOpen('0')}
                    >
                        {t('global.termsOfUse')}
                    </ButtonAbout>{' '}
                    |{' '}
                    <ButtonAbout
                        darkMode={darkMode}
                        onClick={() => modalTermsOpen('1')}
                    >
                        {t('global.privacyPolicy')}
                    </ButtonAbout>
                </SANFlexbox>
            </SANSpace>

            <RMModalTermsAndPrivacy
                onCancel={() => setShowModalTerms(false)}
                visible={showModalTerms}
                defaultActiveKey={activeKey}
                scrolling
            />
        </>
    )
}

export const defaultFooterProps = (darkMode = false) => ({
    logo: logoFooter,
    phone: '0800 327-0035',
    email: 'atendimento@editorasanar.com.br',
    copyright: <Copyright darkMode={darkMode} />,
    attendance: 'Atendimento de Seg. a Sex. das 09h às 18h'
})

interface IProps extends RouteComponentProps, Partial<ISANLayoutFooterProps> {}

const RMFooter = ({ history, ...props }: IProps) => {
    const customProps: ISANLayoutFooterProps = {
        ...defaultFooterProps(),
        HelpButton: {
            onClick: () => history.push('/inicio/central-ajuda')
        },
        ...props
    }
    return (
        <SANBox width='100vw'>
            <SANLayoutFooter {...customProps} />
        </SANBox>
    )
}

export default withRouter<IProps>(RMFooter)
