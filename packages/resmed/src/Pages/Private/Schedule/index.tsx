import React, { useState, useCallback, useEffect } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANPage,
    SANCardSchedule,
    SANBigCalandar,
    SANButton,
    SANSwitch,
    SANRow,
    SANCol
} from '@sanar/components'

const RMSchedule = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')
    return (
        <SANPage
            hasContainer
            ContainerProps={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}
            BoxProps={{
                bg: 'grey-solid.1',
                py: { xs: '8', _: 'xl' },
                display: 'flex',
                flexDirection: 'column'
            }}
            HeaderProps={{
                onBack: () => history.push('/inicio/curso'),
                SessionTitleProps: {
                    title: t('schedule.header.title'),
                    subtitle: t('schedule.header.subtitle')
                }
            }}
        >
            <SANBigCalandar />
        </SANPage>
    )
}

export default withRouter<RouteComponentProps>(RMSchedule)
