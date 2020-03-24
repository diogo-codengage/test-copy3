import React, { useState, useEffect } from 'react'
import ESModalTabs from 'sanar-ui/dist/Components/Organisms/ModalTabs'
import SANPrivacyAndPolicyFrame from './PrivacyAndPolicyFrame'
import SANTermsFrame from './TermsFrame'
import { useTranslation } from 'react-i18next'

const SANModalTermsAndPrivacy = ({ defaultActiveKey, ...props }) => {
    const { t } = useTranslation('esanar')
    const [activeKey, setActiveKey] = useState(defaultActiveKey)

    useEffect(() => {
        setActiveKey(defaultActiveKey)
    }, [defaultActiveKey])

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
            activeKey={activeKey}
            defaultActiveKey={defaultActiveKey}
            content={modalContent}
            {...props}
        />
    )
}

export default SANModalTermsAndPrivacy
