import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANBox, SANPage, SANLayoutContainer } from '@sanar/components'

import RMLive from 'Components/Live'

const RMSpecialty = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')

    return (
        <SANPage
            BoxProps={{
                p: '0'
            }}
            HeaderProps={{
                onBack: () => history.push('/inicio/curso'),
                SessionTitleProps: {
                    title: t('lives.title'),
                    subtitle: t('lives.subtitle')
                }
            }}
        >
            <SANBox my={{ xs: '8', _: 'md' }}>
                <RMLive />
            </SANBox>
        </SANPage>
    )
}

export default withRouter(RMSpecialty)
