import React, { memo, useMemo } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import { isAfter, isBefore, isToday } from 'date-fns'

import { SANBox, SANPage, SANEmpty } from '@sanar/components'

import RMLive from 'Components/Live'
import {
    GET_ACTIVE_LIVE,
    IActiveLiveQuery
} from 'Apollo/Lives/Queries/active-live'

import RMNexts from './Nexts'
import RMPrevious from './Previous'

const RMSpecialty = memo<RouteComponentProps>(({ history }) => {
    const { t } = useTranslation('resmed')
    const { loading, data } = useQuery<IActiveLiveQuery>(GET_ACTIVE_LIVE)

    const status = useMemo(() => {
        if (!loading && !!data) {
            const start = new Date(data.activeLive.startDate)
            const end = new Date(data.activeLive.endDate)
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
            <SANBox pt={{ md: '8', _: '0' }} pb={{ md: '8', _: 'md' }}>
                {!!data ? (
                    <RMLive
                        loading={loading}
                        live={data.activeLive}
                        hasOnline={status.hasOnline}
                        hasLive={status.hasLive}
                    />
                ) : (
                    <SANEmpty title={t('lives.empty')} />
                )}
            </SANBox>
            <RMNexts />
            <RMPrevious />
        </SANPage>
    )
})

export default withRouter(RMSpecialty)
