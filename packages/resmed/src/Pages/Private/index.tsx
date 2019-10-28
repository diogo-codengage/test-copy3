import React from 'react'

import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANErrorBoundary, SANButton } from '@sanar/components'

import { logout } from 'Config/AWSCognito'

const RMPrivatePages: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('resmed')

    const reload = () => {
        history.push('/portal/inicio')
        window.location.reload()
    }

    return (
        <SANErrorBoundary onClick={reload} text={t('global.backStart')}>
            <SANButton onClick={logout}>LOGOUT</SANButton>
        </SANErrorBoundary>
    )
}

export default RMPrivatePages
