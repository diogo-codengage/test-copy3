import React, { useState } from 'react'

import {
    SANLayout,
    ISANLayoutFooterProps,
    SANFlexbox,
    SANSpace,
    SANButton,
    SANTypography
} from '@sanar/components'
import FLXMenuContent from './Menu'

import { useLayoutContext } from './Context'

import logo from 'Assets/images/brand/logo-menu.svg'
import logoFooter from 'Assets/images/brand/logo-grey.svg'
import FLXModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'
import { useTranslation } from 'react-i18next'

const FLXLayout: React.FC = ({ children }) => {
    const { t } = useTranslation('sanarflix')
    const { menuRef, currentMenuTitle } = useLayoutContext()
    const [showModalTerms, setShowModalTerms] = useState(false)
    const [activeKey, setActiveKey] = useState(0)

    const modalTermsOpen = defaultKey => {
        setActiveKey(defaultKey)
        setShowModalTerms(true)
    }

    const MenuProps = {
        children: <FLXMenuContent />,
        logo,
        ref: menuRef,
        title: currentMenuTitle
    }

    const Copyright = () => {
        return (
            <SANSpace p={24}>
                <SANFlexbox
                    flexWrap='wrap'
                    alignItems='center'
                    justifyContent='center'
                >
                    <SANTypography color='grey.5' textAlign='center'>
                        Copyright © Sanarflix. Todos os direitos reservados.
                    </SANTypography>
                    <SANButton
                        bold
                        size='xsmall'
                        color='primary'
                        variant='text'
                    >
                        Sobre SanarFlix
                    </SANButton>{' '}
                    |{' '}
                    <SANButton
                        bold
                        size='xsmall'
                        color='primary'
                        variant='text'
                        onClick={() => modalTermsOpen('0')}
                    >
                        {t('global.useTerms')}
                    </SANButton>{' '}
                    |{' '}
                    <SANButton
                        bold
                        size='xsmall'
                        color='primary'
                        variant='text'
                        onClick={() => modalTermsOpen('1')}
                    >
                        Termos de Privacidade
                    </SANButton>
                </SANFlexbox>
            </SANSpace>
        )
    }

    const FooterProps: ISANLayoutFooterProps = {
        logo: logoFooter,
        phone: '71 3052-4831',
        whatsapp: '71 99172-4740',
        email: 'suportesanarflix@editorasanar.com.br',
        facebook:
            'https://www.facebook.com/sanarflix.med/?utm_source=facebook&utm_medium=facebook-sanarflix&utm_campaign=facebook-tf-sanarflix&utm_term=facebook-med-sanarflix',
        instagram:
            'https://www.instagram.com/sanarflix.med/?utm_source=instagram&utm_medium=sanarflix&utm_campaign=sanarflix-tf-sanarflix&utm_term=sanarflix-med',
        youtube:
            'youtube.com/sanarmedicina?utm_source=youtube&utm_medium=sanarmed&utm_campaign=sanarflix-tf-youtube&utm_term=sanarflix-med',
        copyright: <Copyright />
    }

    return (
        <>
            <SANLayout
                showContinueBar={true}
                FooterProps={FooterProps}
                MenuProps={MenuProps}
            >
                {children}
            </SANLayout>

            <FLXModalTermsAndPrivacy
                onCancel={() => setShowModalTerms(false)}
                visible={showModalTerms}
                defaultActiveKey={activeKey}
                scrolling
            />
        </>
    )
}

export default FLXLayout
