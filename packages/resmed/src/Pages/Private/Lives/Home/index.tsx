import React, { memo, useMemo } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import { isAfter, isBefore, isToday } from 'date-fns'

import { SANBox, SANPage } from '@sanar/components'
import { getUTCDate } from '@sanar/utils/dist/Date'

import RMLive from 'Components/Live'
import {
    GET_ACTIVE_LIVE,
    IActiveLiveQuery
} from 'Apollo/Lives/Queries/active-live'

import RMNexts from './Nexts'
import RMPrevious from './Previous'

const RMSpecialty = memo<RouteComponentProps>(({ history }) => {
    const { t } = useTranslation('resmed')
    const { loading, data } = useQuery<IActiveLiveQuery>(GET_ACTIVE_LIVE, {
        pollInterval: 60000
    })

    const status = useMemo(() => {
        if (!loading && !!data) {
            const start = getUTCDate(data.activeLive.startDate)
            const end = getUTCDate(data.activeLive.endDate)
            const now = new Date()
            return {
                hasOnline: isAfter(now, start) && isBefore(now, end),
                hasLive: isToday(start)
            }
        }
        return {
            hasOnline: false,
            hasLive: false
        }
    }, [data, loading])

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
                <RMLive
                    loading={loading}
                    live={!!data ? data.activeLive : undefined}
                    hasOnline={status.hasOnline}
                    hasLive={status.hasLive}
                />
            </SANBox>
            <RMNexts />
            <RMPrevious />
        </SANPage>
    )
})

export default withRouter(RMSpecialty)
