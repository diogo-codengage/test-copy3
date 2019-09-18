import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { withRouter, RouterProps } from 'react-router'
import { useLayoutContext } from './Context'

import {
    SANLayout,
    ISANLayoutFooterProps,
    SANFlexbox,
    SANSpace,
    SANButton,
    SANTypography
} from '@sanar/components'
import FLXMenuContent from './Menu'
import FLXModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'

import logo from 'Assets/images/brand/logo-menu.svg'
import logoFooter from 'Assets/images/brand/logo-grey.svg'

const resources = {
    Document: 'documento',
    Video: 'video',
    Question: 'quiz'
}

const ButtonAbout = ({ darkMode, ...props }) => (
    <SANButton
        bold
        size='xsmall'
        color={darkMode ? 'white' : 'primary'}
        variant='text'
        {...props}
    />
)

const FLXLayout: React.FC<RouterProps> = ({ history, children }) => {
    const { t } = useTranslation('sanarflix')
    const {
        menuRef,
        currentMenuTitle,
        darkMode,
        menuContext,
        setMenuState,
        footerProps,
        lastAccessed
    } = useLayoutContext()
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
        title: currentMenuTitle,
        onHome: () => history.push('/portal/inicio'),
        context: menuContext,
        theme: darkMode ? 'dark' : 'primary',
        onToggle: setMenuState,
        continueCourseProps: {
            loading: !lastAccessed,
            ...(lastAccessed && {
                module: lastAccessed.theme_title,
                description: lastAccessed.content_name,
                resourceType: lastAccessed.resource_type,
                onContinue: () =>
                    history.push(
                        `/portal/sala-aula/${lastAccessed.course.id}/${
                            lastAccessed.theme_id
                        }/${resources[lastAccessed.resource_type]}/${
                            lastAccessed.resource_id
                        }`
                    )
            })
        }
    }

    const Copyright = () => {
        return (
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
                        Copyright © Sanarflix. {t('global.copyright')}.
                    </SANTypography>
                    <ButtonAbout darkMode={darkMode}>
                        {t('global.about')}
                    </ButtonAbout>{' '}
                    |{' '}
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
        copyright: <Copyright />,
        darkMode,
        ...footerProps
    }

    console.log(!!lastAccessed)

    return (
        <>
            <SANLayout
                showContinueBar={!!lastAccessed}
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

export default withRouter(FLXLayout)
