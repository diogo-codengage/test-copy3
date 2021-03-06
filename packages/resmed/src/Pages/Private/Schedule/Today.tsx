import React, { useState, useEffect, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { format } from 'date-fns'

import {
    SANTypography,
    SANSessionTitle,
    SANCardEvent,
    SANEmpty,
    SANBox,
    useSnackbarContext
} from '@sanar/components'
import { getUTCDate } from '@sanar/utils/dist/Date'

import emptyImage from 'Assets/images/empty/empty.svg'

import {
    GET_APPOINTMENTS,
    IAppointmentsQuery
} from 'Apollo/Schedule/Queries/appointments'

import { formatMinutes, getStatus, getEventType } from './index'
import { useScheduleContext } from './Context'
import { IOption } from './Modal'

export const Skeleton = () => (
    <>
        <SANBox height='69px' mb='md' borderRadius='base' bg='grey.0' />
        <SANBox height='69px' mb='md' borderRadius='base' bg='grey.0' />
        <SANBox height='69px' mb='md' borderRadius='base' bg='grey.0' />
        <SANBox height='69px' mb='md' borderRadius='base' bg='grey.0' />
    </>
)

const RMToday = ({ hasModified }) => {
    const { t } = useTranslation('resmed')
    const createSnackbar = useSnackbarContext()
    const client = useApolloClient()
    const { setModalSchedule } = useScheduleContext()
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState<IOption[]>([])

    const handleShowModal = event => {
        setModalSchedule({ visible: true, options: event })
    }

    useEffect(() => {
        const fetchEventsToday = async () => {
            setLoading(true)
            try {
                const {
                    data: { appointments }
                } = await client.query<IAppointmentsQuery>({
                    query: GET_APPOINTMENTS,
                    fetchPolicy: 'network-only',
                    variables: {
                        start: format(new Date(), 'YYYY-MM-DD'),
                        end: format(new Date(), 'YYYY-MM-DD'),
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
                    message: t('schedule.loadingToday'),
                    theme: 'error'
                })
            }
            setLoading(false)
        }
        fetchEventsToday()
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
                onClick={() => handleShowModal(event)}
                mb='xs'
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <>
            <SANSessionTitle
                title={t('schedule.today')}
                subtitle={
                    <SANTypography
                        transform='uppercase'
                        color='grey.5'
                        fontWeight='bold'
                    >
                        {new Date().toLocaleDateString('pt-BR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </SANTypography>
                }
            />
            {loading ? (
                <Skeleton />
            ) : !!events.length ? (
                events.map(renderEvent)
            ) : (
                <SANEmpty
                    image={emptyImage}
                    title={t('schedule.emptyToday')}
                    mt='xl'
                />
            )}
        </>
    )
}

export default RMToday
