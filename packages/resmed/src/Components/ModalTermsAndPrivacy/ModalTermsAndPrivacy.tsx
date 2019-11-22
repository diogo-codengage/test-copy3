import React, { useState } from 'react'
import { SANModalTabs } from '@sanar/components'
import SANPrivacyAndPolicyFrame from './PrivacyAndPolicyFrame'
import SANTermsFrame from './TermsFrame'
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
                <SANTermsFrame
                    tosRequired={tosRequired && !signed.includes(0) === true}
                    onClick={() => handleActiveKey(0)}
                />
            )
        },
        {
            title: t('global.privacyPolicy'),
            content: (
                <SANPrivacyAndPolicyFrame
                    tosRequired={tosRequired && !signed.includes(1) === true}
                    onClick={() => handleActiveKey(1)}
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
