import React, { Suspense } from 'react'

import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANErrorBoundary } from '@sanar/components'

import RMSplashLoader from 'Components/SplashLoader'
import RMLayoutProvider from 'Pages/Private/Layout/Context'
import RMLayout from 'Pages/Private/Layout'

const RMPrivatePages: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('resmed')

    const reload = () => {
        history.push('/portal/inicio')
        window.location.reload()
    }

    return (
        <SANErrorBoundary onClick={reload} text={t('global.backStart')}>
            <RMLayoutProvider>
                <RMLayout>
                    <Suspense fallback={<RMSplashLoader size='flexible' />}>
                        INICIO
                    </Suspense>
                </RMLayout>
            </RMLayoutProvider>
        </SANErrorBoundary>
    )
}

export default RMPrivatePages
