import React, { memo } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANBox, SANPage } from '@sanar/components'

import RMLive from 'Components/Live'

import RMNexts from './Nexts'
import RMPrevious from './Previous'

const RMSpecialty = memo<RouteComponentProps<{ liveId: string }>>(
    ({ history, match }) => {
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
                    <RMLive id={match.params.liveId} />
                </SANBox>
                <RMNexts />
                <RMPrevious />
            </SANPage>
        )
    }
)

export default withRouter(RMSpecialty)
