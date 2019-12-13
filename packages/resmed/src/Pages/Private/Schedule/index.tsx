import React, { useState, useEffect, useRef } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useApolloClient } from '@apollo/react-hooks'
import { format, isEqual } from 'date-fns'

import {
    SANPage,
    SANBigCalendar,
    SANButton,
    SANSwitch,
    SANRow,
    SANCol,
    SANTypography,
    SANEvaIcon,
    SANBox,
    SANLayoutContainer
} from '@sanar/components'
import { IEvent } from '@sanar/components/dist/Components/Organisms/BigCalendar'

import {
    GET_APPOINTMENTS,
    IAppointmentsQuery,
    IAppointment
} from 'Apollo/Schedule/Queries/appointments'
import {
    UPDATE_APPOINTMENT,
    IUpdateAppointment
} from 'Apollo/Schedule/Mutations/update-appointment'
import { RESET_SCHEDULE, IResetSchedule } from 'Apollo/Schedule/Mutations/reset'

import { useAuthContext } from 'Hooks/auth'

import {
    RMModalSchedule,
    RMModalSuggestion,
    RMModalMore,
    IOption
} from './Modal'

import RMToday from './Today'
import RMWeek from './Week'

const SuggestionStyled = styled(SANBox)`
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${theme('colors.grey.1')};
    border-radius: ${theme('radii.base')};
    padding: ${theme('space.sm')} ${theme('space.lg')};
`

const Suggestion = ({ onChange, checked, ...props }) => {
    const { t } = useTranslation('resmed')
    return (
        <SuggestionStyled {...props}>
            <SANTypography fontWeight='bold' mr='lg'>
                {t('schedule.suggestion')}
            </SANTypography>
            <SANSwitch onChange={onChange} checked={checked} />
        </SuggestionStyled>
    )
}

const boxProps = {
    py: { md: '8', _: 'xl' },
    display: 'flex',
    flexDirection: 'column'
}

export const getStatus = event => {
    switch (event.resource.type) {
        case 'Exam':
            return 'exams'
        case 'Live':
            return 'live'
        case 'Level':
            return event.seen ? 'viewed' : 'unseen'
        default:
            return 'unseen'
    }
}

const formatMinutes = minutes =>
    new Date(minutes * 60000).toISOString().substr(11, 5)

const makeEvents = (event: IAppointment, hasModified = false) => ({
    extendedProps: {
        ...event,
        subtitle: formatMinutes(event.timeInMinutes)
    },
    id: event.id,
    title: event.title,
    start: new Date(event.start),
    startEditable: hasModified ? !event.fixed : false,
    status: getStatus(event)
})

const RMSchedule = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')
    const calendarRef = useRef<SANBigCalendar>()
    const client = useApolloClient()
    const { activeCourse } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [hasModified, setModified] = useState(false)
    const [currentRange, setCurrentRange] = useState({
        start: '',
        end: ''
    })
    const [events, setEvents] = useState<IEvent[]>([])
    const [modalSchedule, setModalSchedule] = useState<{
        visible: boolean
        options: IOption | any
    }>({
        visible: false,
        options: {}
    })
    const [modalSuggestion, setModalSuggestion] = useState({
        visible: false,
        checked: true
    })
    const [modalMore, setModalMore] = useState<{
        visible: boolean
        options: IOption[] | []
    }>({
        visible: false,
        options: []
    })

    const handleChangeMonth = dates => {
        if (
            !isEqual(dates.start, currentRange.start) ||
            !isEqual(dates.end, currentRange.end)
        ) {
            setCurrentRange(dates)
        }
    }

    const handleEventLimitClick = e => {
        setModalMore({
            visible: true,
            options: e.segs
                .filter(seg => !!seg.eventRange.def.extendedProps.id)
                .map(seg => seg.eventRange.def.extendedProps)
        })
    }

    const handleEventClick = e =>
        setModalSchedule({ visible: true, options: e.event.extendedProps })

    const handleChangeSuggestion = checked =>
        setModalSuggestion({ checked, visible: true })

    const handleConfirmSuggestion = async () => {
        try {
            setLoading(true)
            setModalSuggestion({ checked: hasModified, visible: false })
            const {
                data: { resetSchedule }
            } = await client.mutate<IResetSchedule>({
                mutation: RESET_SCHEDULE,
                variables: {
                    start: format(currentRange.start, 'YYYY-MM-DD'),
                    end: format(currentRange.end, 'YYYY-MM-DD')
                }
            })
            setEvents(resetSchedule.items.map(makeEvents) as IEvent[])
            setModified(old => !old)
        } catch {
            setModalSuggestion({ checked: !hasModified, visible: false })
        }
        setLoading(false)
    }

    const handleEventDrop = e => {
        const { event } = e
        const date = new Date(new Date(event.start).toUTCString()).toISOString()
        try {
            client.mutate<IUpdateAppointment>({
                mutation: UPDATE_APPOINTMENT,
                variables: {
                    id: event.extendedProps.id,
                    date
                }
            })
        } catch {
            e.revert()
        }
    }

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                const {
                    data: { appointments }
                } = await client.query<IAppointmentsQuery>({
                    query: GET_APPOINTMENTS,
                    variables: {
                        start: format(currentRange.start, 'YYYY-MM-DD'),
                        end: format(currentRange.end, 'YYYY-MM-DD')
                    }
                })
                setEvents(
                    appointments.items.map(event =>
                        makeEvents(event, appointments.hasModified)
                    ) as IEvent[]
                )
                setModified(appointments.hasModified)
                setModalSuggestion(old => ({
                    ...old,
                    checked: !appointments.hasModified
                }))
            } catch {}
            setLoading(false)
        }
        if (!!currentRange.start && !!currentRange.end) fetchEvents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRange])

    return (
        <>
            <RMModalMore
                {...modalMore}
                onCancel={() => setModalMore({ options: [], visible: false })}
            />
            <RMModalSchedule
                visible={modalSchedule.visible}
                options={modalSchedule.options}
                onCancel={() =>
                    setModalSchedule({ visible: false, options: undefined })
                }
                onClick={() =>
                    setModalSchedule({ visible: false, options: undefined })
                }
            />
            <RMModalSuggestion
                visible={modalSuggestion.visible}
                checked={modalSuggestion.checked}
                onCancel={() =>
                    setModalSuggestion(old => ({
                        checked: !hasModified,
                        visible: false
                    }))
                }
                onConfirm={handleConfirmSuggestion}
            />
            <SANPage
                BoxProps={{
                    p: '0'
                }}
                HeaderProps={{
                    onBack: () => history.push('/inicio/curso'),
                    SessionTitleProps: {
                        title: t('schedule.header.title'),
                        subtitle: t('schedule.header.subtitle')
                    }
                }}
            >
                <SANBox bg='grey-solid.1' {...boxProps}>
                    <SANLayoutContainer>
                        <Suggestion
                            mb='md'
                            display={{ md: 'none', _: 'flex' }}
                            onChange={handleChangeSuggestion}
                            checked={modalSuggestion.checked}
                        />
                        <SANBox mx={{ md: '0', _: '-16px' }}>
                            <SANBigCalendar
                                ref={calendarRef}
                                loading={loading}
                                events={events}
                                eventClick={handleEventClick}
                                eventDrop={handleEventDrop}
                                eventLimitClick={handleEventLimitClick}
                                onChangeMonth={handleChangeMonth}
                                validRange={{
                                    start: format(
                                        new Date('2018-12-01'),
                                        'YYYY-MM-DD'
                                    ),
                                    end: format(
                                        new Date('2020-01-31'),
                                        'YYYY-MM-DD'
                                    )
                                }}
                            />
                        </SANBox>

                        <SANBox
                            mt={{ md: '8', _: 'lg' }}
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <Suggestion
                                display={{ md: 'flex', _: 'none' }}
                                onChange={handleChangeSuggestion}
                                checked={modalSuggestion.checked}
                            />
                            <SANButton
                                size='small'
                                variant='outlined'
                                bold
                                blockOnlyMobile
                            >
                                <SANEvaIcon name='download-outline' mr='xs' />
                                {t('schedule.pdfDownload')}
                            </SANButton>
                        </SANBox>
                    </SANLayoutContainer>
                </SANBox>
                <SANBox {...boxProps}>
                    <SANLayoutContainer>
                        <SANRow gutter={24}>
                            <SANCol xs={24} sm={24} md={12}>
                                <RMToday hasModified={hasModified} />
                            </SANCol>
                            <SANCol xs={24} sm={24} md={12}>
                                <RMWeek hasModified={hasModified} />
                            </SANCol>
                        </SANRow>
                    </SANLayoutContainer>
                </SANBox>
            </SANPage>
        </>
    )
}

export default withRouter<RouteComponentProps>(RMSchedule)
