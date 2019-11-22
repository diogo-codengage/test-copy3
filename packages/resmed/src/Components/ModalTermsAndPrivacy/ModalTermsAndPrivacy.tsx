import React, { useState } from 'react'
import { SANModalTabs } from '@sanar/components'
import RMPrivacyAndPolicyFrame from './PrivacyAndPolicyFrame'
import RMTermsFrame from './TermsFrame'
import { useTranslation } from 'react-i18next'

import logo from 'Assets/images/brand/logo.svg'

const SANModalTermsAndPrivacy = ({
    defaultActiveKey,
    tosRequired = false,
    ...props
}) => {
    const { t } = useTranslation('resmed')
    const [activeKey, setActiveKey] = useState(defaultActiveKey)
    const [signed, setSigned] = useState<number[]>([])

    const handleActiveKey = key => {
        let aux = signed
        aux.push(key)
        setSigned(aux)
        key === 0 ? setActiveKey(1) : setActiveKey(0)
    }
    const modalContent = [
        {
            title: t('global.termsOfUse'),
            content: (
                <RMTermsFrame
                    onAccept={
                        !signed.includes(1) &&
                        tosRequired &&
                        (() => handleActiveKey(1))
                    }
                />
            )
        },
        {
            title: t('global.privacyPolicy'),
            content: (
                <RMPrivacyAndPolicyFrame
                    onAccept={
                        !signed.includes(0) &&
                        tosRequired &&
                        (() => handleActiveKey(0))
                    }
                />
            )
        }
    ]

    return (
        <SANModalTabs
            imageHeader={logo}
            key={defaultActiveKey}
            activeKey={activeKey}
            closable={false}
            defaultActiveKey={defaultActiveKey}
            content={modalContent}
            {...props}
        />
    )
}

export default SANModalTermsAndPrivacy
