import React, { useState, useEffect, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { format } from 'date-fns'

import {
    SANTypography,
    SANSessionTitle,
    SANCardEvent,
    SANEmpty,
    SANSpin
} from '@sanar/components'

import emptyImage from 'Assets/images/empty/empty.svg'

import {
    GET_APPOINTMENTS,
    IAppointmentsQuery,
    IAppointment
} from 'Apollo/Schedule/Queries/appointments'

import { getStatus } from './index'

const RMToday = () => {
    const { t } = useTranslation('resmed')
    const client = useApolloClient()
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState<IAppointment[]>([])

    useEffect(() => {
        const fetchEventsToday = async () => {
            setLoading(true)
            try {
                const {
                    data: { appointments }
                } = await client.query<IAppointmentsQuery>({
                    query: GET_APPOINTMENTS,
                    variables: {
                        start: format(new Date(), 'YYYY-MM-DD'),
                        end: format(new Date(), 'YYYY-MM-DD'),
                        exact: true
                    }
                })
                setEvents(
                    appointments.map(v => ({
                        ...v,
                        type: getStatus(v)
                    }))
                )
            } catch {}
            setLoading(false)
        }
        fetchEventsToday()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderEvent = useCallback(
        event => (
            <SANCardEvent
                key={event.id}
                title={event.title}
                date='12/06/2019, às 10h até 12/07/2019, às 18h'
                type={getStatus(event)}
                mb='xs'
            />
        ),
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
                <SANSpin flex minHeight={130} />
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
