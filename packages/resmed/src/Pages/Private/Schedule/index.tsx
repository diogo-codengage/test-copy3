import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme, switchProp } from 'styled-tools'
import { useApolloClient } from '@apollo/react-hooks'
import { format, isEqual, getMonth } from 'date-fns'
import { compose } from 'ramda'
import { useAuthContext } from 'Hooks/auth'

import {
    SANPage,
    SANBigCalendar,
    SANSwitch,
    SANRow,
    SANCol,
    SANTypography,
    SANBox,
    SANLayoutContainer,
    useSnackbarContext,
    SANEvaIcon,
    SANButton,
    ISANBoxProps
} from '@sanar/components'
import { IEvent } from '@sanar/components/dist/Components/Organisms/BigCalendar'
import { getUTCDate } from '@sanar/utils/dist/Date'
import { createDebounce } from '@sanar/utils/dist/Debounce'

import {
    GET_APPOINTMENTS,
    IAppointmentsQuery,
    IAppointment
} from 'Apollo/Schedule/Queries/appointments'
import {
    UPDATE_APPOINTMENT,
    IUpdateAppointment
} from 'Apollo/Schedule/Mutations/update-appointment'
import { RESET_SCHEDULE } from 'Apollo/Schedule/Mutations/reset'

import { useLayoutContext } from 'Pages/Private/Layout/Context'

import {
    RMModalSchedule,
    RMModalSuggestion,
    RMModalMore,
    IOption
} from './Modal'

import { useScheduleContext, withScheduleContext } from './Context'

import RMToday from './Today'
import RMWeek from './Week'
import { useMainContext } from '../Context'

const SuggestionStyled = styled(SANBox)`
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${theme('colors.grey.1')};
    border-radius: ${theme('radii.base')};
    padding: ${theme('space.sm')} ${theme('space.lg')};
`

const Suggestion = ({ onChange, checked, loading, ...props }) => {
    const { t } = useTranslation('resmed')
    return (
        <SuggestionStyled {...props}>
            <SANTypography fontWeight='bold' mr='lg'>
                {t('schedule.suggestion')}
            </SANTypography>
            <SANSwitch
                onChange={onChange}
                checked={checked}
                loading={loading}
            />
        </SuggestionStyled>
    )
}

type IType = 'viewed' | 'unseen' | 'complementary'

const SubtitleDot = styled.span<{ type: IType }>`
    height: 12px;
    width: 12px;
    background-color: ${switchProp('type', {
        viewed: '#9EF0DA',
        unseen: '#FFDBE7',
        complementary: '#11131766',
    })};
    border-radius: 50%;
    display: inline-block;
    margin-top: 30px;
    box-shadow: 1px 3px 5px ${switchProp('type', { 
        viewed: '#8eefd5',
        unseen: '#f5b6cb',
        complementary: '#11131766',
    })};
`
const SubtitleLabel = styled(SANTypography)`
    display: inline-block;
    margin-left: 15px;
    margin-right: 30px;
`
const Subtitle = ({...props}) => {
    const { t } = useTranslation('resmed')
    return (
        <SANBox {...props}>
            <SubtitleDot type={'unseen'} /><SubtitleLabel>{t('schedule.subtitle.unseen')}</SubtitleLabel>
            <SubtitleDot type={'viewed'} /><SubtitleLabel>{t('schedule.subtitle.viewed')}</SubtitleLabel>
            <SubtitleDot type={'complementary'} /><SubtitleLabel>{t('schedule.subtitle.complementary')}</SubtitleLabel>
        </SANBox>
    )
}

const boxProps: ISANBoxProps = {
    py: { md: '8', _: 'xl' },
    display: 'flex',
    flexDirection: 'column'
}

export const getStatus = event => {
    switch (event.resourceType) {
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

export const getEventType = event => {
    if (!event.resourceType || event.resourceType === 'Exam') {
        return 'complementary'
    }
    return event.seen ? 'viewed' : 'unseen'
}

export const formatMinutes = minutes =>
    new Date(minutes * 60000).toISOString().substr(11, 5)

const getSubtitle = event => {
    if (event.resourceType === 'Live' && !!event.accessLive) {
        const startDate = new Date(event.accessLive.startDate)
        return format(
            startDate,
            startDate.getMinutes() ? 'HH[h] mm[m]' : 'HH[h]'
        )
    } else {
        return formatMinutes(event.timeInMinutes)
    }
}

export const makeEvent = (event: IAppointment, hasModified = false) => ({
    extendedProps: {
        ...event,
        subtitle: getSubtitle(event)
    },
    id: event.id,
    title: event.title,
    start: getUTCDate(event.start),
    startEditable: hasModified ? !event.fixed : false,
    status: getStatus(event),
    type: getEventType(event),
})

interface ISchedule {
    hasModified: boolean
    items: IEvent[]
    interval: {
        start: string
        end: string
    }
}

const RMSchedule: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('resmed')
    const { handleTrack } = useMainContext()
    const {
        me: { id: userId },
        activeCourse: { id: courseId, name: courseName }
    } = useAuthContext()
    const { fetchSuggestedClass } = useLayoutContext()
    const createSnackbar = useSnackbarContext()
    const calendarRef = useRef<typeof SANBigCalendar>()
    const client = useApolloClient()
    const {
        modalSchedule,
        setModalSchedule,
        schedule,
        setSchedule
    } = useScheduleContext()
    const [firstLoad, setFirstLoad] = useState(true)
    const [loading, setLoading] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const [trigger, setTrigger] = useState()
    const [currentRange, setCurrentRange] = useState({
        start: '',
        end: '',
        currentMonth: ''
    })
    const [modalSuggestion, setModalSuggestion] = useState({
        visible: false,
        checked: false
    })
    const [modalMore, setModalMore] = useState<{
        visible: boolean
        date: Date
        options: IOption[] | []
    }>({
        visible: false,
        date: new Date(),
        options: []
    })

    useEffect(() => {
        const scheduleOpened = () => {
            handleTrack('Cronograma Viewed', {
                'User ID': userId
            })
        }
        scheduleOpened()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    const pdfDownload = async () => {
        setDownloading(true)

        const startDate = format(currentRange.currentMonth, 'YYYY-MM-DD')
        const filename = `Cronograma-${t(
            `schedule.monthAbbr.${getMonth(currentRange.currentMonth)}`
        )}-${courseName!.split(' ').join('')}`
        const url = `${process.env.REACT_APP_URL_PDF}?userId=${userId}&courseId=${courseId}&startDate=${startDate}&filename=${filename}`

        fetch(url, { method: 'GET' }).then(response => {
            setDownloading(false)
            if (response.status === 201) {
                // Edge fix download
                if (navigator.msSaveOrOpenBlob) {
                    response.blob().then(blob => {
                        navigator.msSaveOrOpenBlob(blob, `${filename}.pdf`)
                    })
                } else {
                    const link = document.createElement('a')
                    link.href = url
                    link.click()
                }
            } else {
                createSnackbar({
                    message: t('schedule.pdfDownloadFail'),
                    theme: 'error'
                })
            }
        })
    }

    const handleChangeMonth = dates => {
        if (
            !isEqual(dates.start, currentRange.start) ||
            !isEqual(dates.end, currentRange.end) ||
            !isEqual(dates.currentMonth, currentRange.currentMonth)
        ) {
            setCurrentRange(dates)
        }
    }

    const handleEventLimitClick = e => {
        setModalMore({
            visible: true,
            date: e.date,
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
            setModalSuggestion(old => ({
                checked: old.checked,
                visible: false
            }))
            const {
                data: { resetSchedule }
            } = await client.mutate<any>({
                mutation: RESET_SCHEDULE,
                variables: {
                    start: format(currentRange.start, 'YYYY-MM-DD'),
                    end: format(currentRange.end, 'YYYY-MM-DD')
                }
            })
            setTrigger(new Date().getTime())
            setSchedule(old => ({
                ...resetSchedule,
                hasModified: !old.hasModified,
                items: resetSchedule.items.map(event =>
                    makeEvent(event, modalSuggestion.checked)
                ) as IEvent[]
            }))
        } catch {
            createSnackbar({
                message: t('schedule.switchError'),
                theme: 'error'
            })
            setModalSuggestion({
                checked: schedule.hasModified,
                visible: false
            })
        }
        setLoading(false)
    }

    const handleSuggestedClass = useCallback(event => {
        setTimeout(() => {
            setTrigger(new Date().getTime())
            if (!!event.extendedProps) {
                event.extendedProps.status === 'unseen' && fetchSuggestedClass()
            }
        }, 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const debounceCallback = createDebounce(handleSuggestedClass, 1000)

    const handleEventDrop = e => {
        e.jsEvent.preventDefault()
        const { event } = e
        handleTrack('Cronograma Adjust', {
            'Resource type': event.extendedProps.resourceType,
            'Resource ID': event.extendedProps.id,
        })
        const date = new Date(new Date(event.start).toUTCString()).toISOString()
        client
            .mutate<IUpdateAppointment>({
                mutation: UPDATE_APPOINTMENT,
                variables: {
                    id: event.extendedProps.id,
                    date
                }
            })
            .then(() => debounceCallback(event))
            .catch(err => {
                e.revert()
                if (!!err.graphQLErrors.length) {
                    const status500 = err.graphQLErrors.find(
                        e => e.extensions.exception.status === 500
                    )
                    const exceeded422 = err.graphQLErrors.find(
                        e => e.extensions.exception.status === 422
                    )
                    if (!!status500) {
                        createSnackbar({
                            message: t('schedule.changeEvent.error', {
                                name: event.extendedProps.title
                            }),
                            theme: 'error'
                        })
                    }
                    if (!!exceeded422) {
                        createSnackbar({
                            message: t('schedule.changeEvent.exceeded'),
                            theme: 'error'
                        })
                    }
                }
            })
    }

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                const {
                    data: { appointments }
                } = await client.query<IAppointmentsQuery>({
                    query: GET_APPOINTMENTS,
                    fetchPolicy: 'network-only',
                    variables: {
                        start: format(currentRange.start, 'YYYY-MM-DD'),
                        end: format(currentRange.end, 'YYYY-MM-DD')
                    }
                })
                setSchedule({
                    ...appointments,
                    hasModified: firstLoad
                        ? appointments.hasModified
                        : modalSuggestion.checked,
                    items: appointments.items.map(event =>
                        makeEvent(event, appointments.hasModified)
                    ) as IEvent[]
                })
                setModalSuggestion(old => ({
                    ...old,
                    checked: firstLoad
                        ? appointments.hasModified
                        : modalSuggestion.checked
                }))
                firstLoad && setFirstLoad(false)
            } catch {
                createSnackbar({
                    message: t('schedule.loadingError'),
                    theme: 'error'
                })
            }
            setLoading(false)
        }
        if (!!currentRange.start && !!currentRange.end) fetchEvents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRange])

    const validRange = useMemo(() => {
        if (!!schedule.interval.start && !!schedule.interval.end) {
            return {
                start: format(new Date(schedule.interval.start), 'YYYY-MM-DD'),
                end: format(new Date(schedule.interval.end), 'YYYY-MM-DD')
            }
        } else {
            return undefined
        }
    }, [schedule.interval])

    return (
        <>
            <RMModalMore
                {...modalMore}
                onCancel={() =>
                    setModalMore(old => ({
                        ...old,
                        options: [],
                        visible: false
                    }))
                }
            />
            <RMModalSchedule
                visible={modalSchedule.visible}
                options={modalSchedule.options}
                onCancel={() =>
                    setModalSchedule({ visible: false, options: undefined })
                }
            />
            <RMModalSuggestion
                visible={modalSuggestion.visible}
                checked={modalSuggestion.checked}
                onCancel={() =>
                    setModalSuggestion(old => ({
                        checked: !old.checked,
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
                            loading={loading}
                        />
                        <SANBox mx={{ md: '0', _: '-16px' }}>
                            <SANBigCalendar
                                ref={calendarRef}
                                loading={loading}
                                events={schedule.items}
                                eventClick={handleEventClick}
                                eventDrop={handleEventDrop}
                                eventLimitClick={handleEventLimitClick}
                                onChangeMonth={handleChangeMonth}
                                validRange={validRange}
                            />
                        </SANBox>
                        <Subtitle display={{ _: 'none', md: 'block'}}/>

                        <SANBox
                            mt={{ _: 'lg', md: '5' }}
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <Suggestion
                                display={{ _: 'none', md: 'flex' }}
                                onChange={handleChangeSuggestion}
                                checked={modalSuggestion.checked}
                                loading={loading}
                            />
                            {!!(schedule.items && schedule.items.length) && (
                                <SANBox flex={{ _: '1', md: '0' }}>
                                    <SANButton
                                        size='small'
                                        variant='outlined'
                                        bold
                                        block
                                        loading={loading || downloading}
                                        onClick={() => pdfDownload()}
                                    >
                                        <SANEvaIcon
                                            name='download-outline'
                                            mr='xs'
                                        />
                                        {t('schedule.pdfDownload')}
                                    </SANButton>
                                </SANBox>
                            )}
                        </SANBox>
                    </SANLayoutContainer>
                </SANBox>
                <SANBox {...boxProps}>
                    <SANLayoutContainer>
                        <SANRow gutter={24}>
                            <SANCol xs={24} sm={24} md={12}>
                                <RMToday hasModified={trigger} />
                            </SANCol>
                            <SANCol xs={24} sm={24} md={12}>
                                <RMWeek hasModified={trigger} />
                            </SANCol>
                        </SANRow>
                    </SANLayoutContainer>
                </SANBox>
            </SANPage>
        </>
    )
}

const enhance = compose(withScheduleContext, withRouter)

export default enhance(RMSchedule)
