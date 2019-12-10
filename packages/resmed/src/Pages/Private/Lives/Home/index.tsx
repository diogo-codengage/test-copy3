import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANBox, SANPage } from '@sanar/components'

import RMLive from 'Components/Live'

import RMNexts from './Nexts'
import RMPrevious from './Previous'

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
            <SANBox pt={{ xs: '8', _: '0' }} pb={{ xs: '8', _: 'md' }}>
                <RMLive />
            </SANBox>
            <SANBox bg='grey-solid.1' py={{ xs: '8', _: 'md' }}>
                <RMNexts />
            </SANBox>
            <SANBox py={{ xs: '8', _: 'md' }}>
                <RMPrevious />
            </SANBox>
        </SANPage>
    )
}

export default withRouter(RMSpecialty)
