import React, { useState, useEffect, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { format, addDays } from 'date-fns'

import {
    SANTypography,
    SANSessionTitle,
    SANCardEvent,
    SANEmpty,
    useSnackbarContext
} from '@sanar/components'
import { getUTCDate } from '@sanar/utils/dist/Date'

import emptyImage from 'Assets/images/empty/empty.svg'

import {
    GET_APPOINTMENTS,
    IAppointmentsQuery
} from 'Apollo/Schedule/Queries/appointments'

import { formatMinutes, getStatus, getEventType } from './index'
import { Skeleton } from './Today'
import { IOption } from './Modal'
import { useScheduleContext } from './Context'

const getWeekend = () => {
    const curr = new Date()
    const first = curr.getDate() - curr.getDay()
    const last = first + 6

    let end = new Date(addDays(curr.getDay(), last).setMonth(curr.getMonth()))
    end = new Date(
        new Date().getFullYear(),
        end.getMonth(),
        end.getDate(),
        end.getHours(),
        end.getMinutes(),
        end.getSeconds()
    )

    return {
        sunday: format(new Date(curr.setDate(first)), 'YYYY-MM-DD'),
        saturday: format(end, 'YYYY-MM-DD')
    }
}

const RMWeek = ({ hasModified }) => {
    const { t } = useTranslation('resmed')
    const createSnackbar = useSnackbarContext()
    const client = useApolloClient()
    const { setModalSchedule } = useScheduleContext()
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState<IOption[]>([])

    const handleShowModal = event =>
        setModalSchedule({ visible: true, options: event })

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
                    appointments.items.map(event => ({
                        ...event,
                        status: getStatus(event),
                        subtitle: formatMinutes(event.timeInMinutes)
                    }))
                )
            } catch {
                createSnackbar({
                    message: t('schedule.loadingWeek'),
                    theme: 'error'
                })
            }
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
                type={getEventType(event)}
                mb='xs'
                onClick={() => handleShowModal(event)}
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
