import React, { useState, useEffect } from 'react'
import { SANModalTabs } from '@sanar/components'
import RMPrivacyAndPolicyFrame from './PrivacyAndPolicyFrame'
import RMTermsFrame from './TermsFrame'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { useAuthContext } from 'Hooks/auth'
import { IMe } from 'Apollo/User/Queries/me'
import { ACCEPT_TERMS_USE_MUTATION } from 'Apollo/User/Mutations/accept-terms-use'

import logo from 'Assets/images/brand/logo.svg'

const SANModalTermsAndPrivacy = ({
    defaultActiveKey,
    tosRequired = false,
    ...props
}) => {
    const { t } = useTranslation('resmed')
    const client = useApolloClient()
    const { setMe, me } = useAuthContext()
    const [activeKey, setActiveKey] = useState(defaultActiveKey)
    const [signed, setSigned] = useState<number[]>([])
    const [loading, setLoading] = useState(false)

    const handleAccept = async () => {
        setLoading(true)
        try {
            const {
                data: {
                    acceptTermsUse
                    // acceptTermsUse: { subscriptions }
                }
            } = await client.mutate<IMe>({
                mutation: ACCEPT_TERMS_USE_MUTATION
            })
            setMe(acceptTermsUse)
            // setMe({
            //     ...me,
            //     hasSigned: !!subscriptions.find(sb => sb.contract === 'signed')
            // })
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (signed.includes(0) && signed.includes(1)) {
            handleAccept()
        }
    }, [signed])

    const handleActiveKey = key => {
        setSigned(old => [...old, key])
        setActiveKey(key)
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
            loading={loading}
            {...props}
        />
    )
}

export default SANModalTermsAndPrivacy
