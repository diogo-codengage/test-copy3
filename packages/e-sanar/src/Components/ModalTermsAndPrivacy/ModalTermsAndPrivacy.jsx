import React from 'react'
import ESModalTabs from 'sanar-ui/dist/Components/Organisms/ModalTabs'
import SANPrivacyAndPolicyFrame from './PrivacyAndPolicyFrame'
import SANTermsFrame from './TermsFrame'
import { useTranslation } from 'react-i18next'

const SANModalTermsAndPrivacy = ({ defaultActiveKey, ...props }) => {
    const { t } = useTranslation('esanar')
    const modalContent = [
        {
            title: t('global.termsOfUse'),
            content: <SANTermsFrame />
        },
        {
            title: t('global.privacyPolicy'),
            content: <SANPrivacyAndPolicyFrame />
        }
    ]

    return (
        <ESModalTabs
            key={defaultActiveKey}
            defaultActiveKey={defaultActiveKey}
            content={modalContent}
            {...props}
        />
    )
}

export default SANModalTermsAndPrivacy
