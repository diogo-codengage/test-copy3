import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import { useSnackbarContext, SANModalTabs } from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import { IMe } from 'Apollo/User/Queries/me'
import { ACCEPT_TERMS_USE_MUTATION } from 'Apollo/User/Mutations/accept-terms-use'
import { segmentTrack } from 'Config/Segment/track'
import { IOptions } from 'Config/Segment'

import logo from 'Assets/images/brand/logo.svg'

import RMPrivacyAndPolicyFrame from './PrivacyAndPolicyFrame'
import RMTermsFrame from './TermsFrame'

const SANModalTermsAndPrivacy = ({
    defaultActiveKey,
    tosRequired = false,
    closable = true,
    ...props
}) => {
    const { t } = useTranslation('resmed')
    const createSnackbar = useSnackbarContext()
    const client = useApolloClient()
    const { setMe, me } = useAuthContext()
    const [activeKey, setActiveKey] = useState(defaultActiveKey)
    const [signed, setSigned] = useState<number[]>([])
    const [loading, setLoading] = useState(false)
    const [hideLoad, setHideLoad] = useState(false)

    useEffect(() => {
        setActiveKey(defaultActiveKey)
    }, [defaultActiveKey])

    const handleTrack = () => {
        try {
            const data: IOptions = {
                'Plataform ID': process.env.REACT_APP_PLATFORM_ID,
                'User ID': me.id
            }

            segmentTrack('Terms acepted', data)
        } catch (err) {
            console.error('Track:[Terms acepted] error:', err)
        }
    }

    const handleAccept = async () => {
        setLoading(true)
        try {
            handleTrack()
            await client.mutate<IMe>({
                mutation: ACCEPT_TERMS_USE_MUTATION
            })
            setMe(old => ({ ...old, hasActiveSubscription: true } as IMe))
        } catch (error) {
            createSnackbar({
                message: error.message,
                theme: 'error'
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        if (signed.includes(0) && signed.includes(1)) {
            handleAccept()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signed])

    const handleActiveKey = key => {
        if (key) {
            setHideLoad(true)
        }
        setActiveKey(key)
    }

    const handleButton = key => {
        setSigned(old => [...old, key])
        handleActiveKey(key)
    }

    const modalContent = [
        {
            title: t('global.termsOfUse'),
            content: (
                <RMTermsFrame
                    tosRequired={tosRequired}
                    hideLoad={hideLoad}
                    onAccept={
                        !signed.includes(1) &&
                        tosRequired &&
                        (() => handleButton(1))
                    }
                />
            )
        },
        {
            title: t('global.privacyPolicy'),
            content: (
                <RMPrivacyAndPolicyFrame
                    tosRequired={tosRequired}
                    onAccept={
                        !signed.includes(0) &&
                        tosRequired &&
                        (() => handleButton(0))
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
            closable={closable}
            defaultActiveKey={defaultActiveKey}
            content={modalContent}
            loading={loading}
            onTabChange={handleActiveKey}
            {...props}
        />
    )
}

export default SANModalTermsAndPrivacy
