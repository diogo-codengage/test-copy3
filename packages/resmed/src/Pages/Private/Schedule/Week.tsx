import React, { useState, useEffect, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { format } from 'date-fns'

import {
    SANTypography,
    SANSessionTitle,
    SANCardEvent,
    SANEmpty
} from '@sanar/components'
import { getUTCDate } from '@sanar/utils/dist/Date'

import emptyImage from 'Assets/images/empty/empty.svg'

import {
    GET_APPOINTMENTS,
    IAppointmentsQuery,
    IAppointment
} from 'Apollo/Schedule/Queries/appointments'

import { getStatus } from './index'
import { Skeleton } from './Today'

const getWeekend = () => {
    const curr = new Date()
    const first = curr.getDate() - curr.getDay()
    const last = first + 6

    return {
        sunday: format(new Date(curr.setDate(first)), 'YYYY-MM-DD'),
        saturday: format(new Date(curr.setDate(last)), 'YYYY-MM-DD')
    }
}

const RMWeek = ({ hasModified }) => {
    const { t } = useTranslation('resmed')
    const client = useApolloClient()
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState<IAppointment[]>([])

    useEffect(() => {
        const fetchEventsWeek = async () => {
            setLoading(true)
            try {
                const { sunday, saturday } = getWeekend()
                const {
                    data: { appointments }
                } = await client.query<IAppointmentsQuery>({
                    query: GET_APPOINTMENTS,
                    fetchPolicy: 'network-only',
                    variables: {
                        start: sunday,
                        end: saturday,
                        exact: true
                    }
                })
                setEvents(
                    appointments.items.map(v => ({
                        ...v,
                        type: getStatus(v)
                    }))
                )
            } catch {}
            setLoading(false)
        }
        fetchEventsWeek()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasModified])

    const renderEvent = useCallback(
        event => (
            <SANCardEvent
                key={event.id}
                title={event.title}
                date={`${format(
                    getUTCDate(event.start),
                    `DD/MM/YYYY [${t('schedule.at')}] HH[h] [${t(
                        'schedule.until'
                    )}]`
                )} ${t('schedule.at')} ${format(
                    getUTCDate(event.end),
                    `DD/MM/YYYY [${t('schedule.at')}] HH[h]`
                )}`}
                type={getStatus(event)}
                mb='xs'
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <>
            <SANSessionTitle
                title={t('schedule.thisWeek.title')}
                subtitle={
                    <SANTypography color='grey.5' fontWeight='bold'>
                        {t('schedule.thisWeek.subtitle')}
                    </SANTypography>
                }
                mt={{ md: '0', _: 'xl' }}
            />
            {loading ? (
                <Skeleton />
            ) : !!events.length ? (
                events.map(renderEvent)
            ) : (
                <SANEmpty
                    image={emptyImage}
                    title={t('schedule.emptyWeek')}
                    mt='xl'
                />
            )}
        </>
    )
}

export default RMWeek
