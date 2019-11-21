import React from 'react'
import ESModalTabs from 'sanar-ui/dist/Components/Organisms/ModalTabs'
import FLXPrivacyAndPolicyFrame from './PrivacyAndPolicyFrame'
import FLXTermsFrame from './TermsFrame'
import { useTranslation } from 'react-i18next'

import logo from 'Assets/images/brand/logo.svg'

const FLXModalTermsAndPrivacy = ({ defaultActiveKey, ...props }) => {
    const { t } = useTranslation('resmed')
    const modalContent = [
        {
            title: t('global.termsOfUse'),
            content: <FLXTermsFrame tosRequired />
        },
        {
            title: t('global.privacyPolicy'),
            content: <FLXPrivacyAndPolicyFrame tosRequired />
        }
    ]

    return (
        <ESModalTabs
            imageHeader={logo}
            key={defaultActiveKey}
            defaultActiveKey={defaultActiveKey}
            content={modalContent}
            {...props}
        />
    )
}

export default FLXModalTermsAndPrivacy
