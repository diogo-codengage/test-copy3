import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react'

import { EventApi, View, Duration } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import ptLocale from '@fullcalendar/core/locales/pt-br'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import { isPast, format, isEqual, eachWeekendOfYear, isSameDay } from 'date-fns'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useTranslation } from 'react-i18next'

import { useWindowSize } from '@sanar/utils/dist/Hooks'

import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'

import './big-calendar.css'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { SANSpin } from '../../Atoms/Spin'

export interface IEvent {
    id: string
    title: string
    url?: string
    start?: Date
    end?: Date
    status?: 'viewed' | 'unseen' | 'live' | 'exams'
    rendering?: 'background' | 'inverse-background'
    startEditable?: boolean
    extendedProps?: object
}

export interface ISANBigCalendarProps {
    loading?: boolean
    events: IEvent[]
    onChangeMonth?: (arg: { start: Date; end: Date }) => void
    eventLimitClick?: (arg: {
        date: Date
        allDay: boolean
        dayEl: HTMLElement
        moreEl: HTMLElement
        segs: any[]
        hiddenSegs: any[]
        jsEvent: MouseEvent
        view: View
    }) => void
    eventClick?: (arg: {
        el: HTMLElement
        event: EventApi
        jsEvent: MouseEvent
        view: View
    }) => void
    dateClick?: (arg: {
        date: Date
        dateStr: string
        allDay: boolean
        resource?: any
        dayEl: HTMLElement
        jsEvent: MouseEvent
        view: View
    }) => void
    eventDrop?: (arg: {
        el: HTMLElement
        event: EventApi
        oldEvent: EventApi
        delta: Duration
        revert: () => void
        jsEvent: Event
        view: View
    }) => void
}

const FullCalendarWrapper = styled.div`
    &&&& {
        & .fc {
            background-color: ${theme('colors.white.10')};
            border-radius: ${theme('radii.base')};
            box-shadow: ${theme('shadows.1')};
        }

        & .fc-right button,
        & .fc-left button {
            background-color: ${theme('colors.grey.0')};
            border: none;
            color: ${theme('colors.grey.6')};
            border-radius: 12px;
            width: 24px;
            height: 24px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            &:focus,
            &:hover {
                background-color: ${theme('colors.grey.1')};
                color: ${theme('colors.grey.8')};
            }

            & .fc-icon {
                font-size: ${theme('fontSizes.lg')};
            }
        }

        & .fc-toolbar {
            justify-content: center;
            margin: 0;
            border: 1px solid ${theme('colors.grey.2')};
            border-bottom: 0;
            border-top-left-radius: ${theme('radii.base')};
            border-top-right-radius: ${theme('radii.base')};
            & .fc-center {
                padding: 0 ${theme('space.8')};
            }

            &.fc-header-toolbar {
                padding: 1.4em 1.2em;
            }

            ${theme('mediaQueries.down.xs')} {
                justify-content: space-between;
                & .fc-center {
                    padding: 0;
                }
            }
        }

        & .fc-center h2 {
            font-weight: bold;
            font-size: 1.5em;
        }

        & .fc-day-header {
            text-transform: uppercase;
            font-size: 0.7em;
            padding: 0.7em 0;
        }

        & .fc-event-container .fc-day-grid-event {
            padding: 0 8px;
            border-radius: 8px;
            margin: 1px 8px 0;
            & .fc-content {
                overflow: hidden;
                text-overflow: ellipsis;;
            }
        }

        & .fc-more {
            text-transform: uppercase;
            font-size: 0.7em;
            font-weight: bold;
            float: right;
            color: ${theme('colors.grey.6')};
            margin-top: 4px;
            margin-right: 10px;
        }

        & .fc-highlight {
            background-color: ${theme('colors.primary')};
        }

        
        & .fc-day-number {
            float: left;
            font-size: 0.7em;
            margin-left: 8px;
            margin-bottom: 4px;
        }

        & .fc-today {
            & .fc-day-number {
                background: transparent;
                border-color: inherit;
                position: relative;
                &:before {
                    content: '${() => format(new Date(), 'd')}';
                    font-size: 0.7em;
                    width: 15px;
                    height: 15px;
                    border-radius: 9px;
                    background-color: ${theme('colors.primary')};
                    color: ${theme('colors.white.10')};
                    position: absolute;
                    left: 1px;
                    top: 2px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }

        & .fc-content-skeleton {
            bottom: 0;
        }

        & .fc-popover {
            /* top: calc(50% - 115px) !important; */
            left: calc(50% - 150px) !important;

            &:before {
                content: '';
                position: absolute;
                background-color: rgba(0, 0, 0, 0.65);
            }

            &.fc-more-popover {
                width: 300px;
            }

            & .fc-event-container {
                 padding: ${theme('space.sm')};

                 & .fc-day-grid-event {
                     margin-bottom: ${theme('space.xs')};
                 }
            }

            & .fc-header {
                 padding: ${theme('space.sm')};
                 font-size: ${theme('fontSizes.lg')};
                 font-weight: bold;
            }
        }
    }
`

const getFreeDays = (current = new Date().getFullYear()) => {
    return [
        ...eachWeekendOfYear(new Date(current - 1, 1, 1)),
        ...eachWeekendOfYear(new Date(current, 1, 1)),
        ...eachWeekendOfYear(new Date(current + 1, 1, 1))
    ].map(e => ({
        start: new Date(e),
        id: `freeday-${new Date(e).getTime()}`,
        allDay: true,
        classNames: 'san-free-day'
    }))
}

const SANBigCalendar: React.FC<ISANBigCalendarProps> = (
    { events = [], eventDrop, loading = false, onChangeMonth, ...props },
    ref
) => {
    const { t } = useTranslation('components')
    const theme = useThemeContext()
    const calendarRef = useRef<FullCalendar>()
    const { width } = useWindowSize()

    const handleChangeMonth = (arg: { view: View; el: HTMLElement }) => {
        !!onChangeMonth &&
            onChangeMonth({
                start: arg.view.activeStart,
                end: arg.view.activeEnd
            })
    }

    const handleEventDrop = e => {
        const calendar = calendarRef.current.getApi()
        const events = calendar.getEvents()
        const newDate = e.event.start
        const oldDate = e.oldEvent.start

        const freeDay = events.find(
            event =>
                isEqual(event.start, newDate) && event.id.includes('freeday')
        )
        !!freeDay && freeDay.remove()

        const hasOldFreeDay = freeDays.find(event =>
            isEqual(event.start, oldDate)
        )
        const isEmptyDay = events.find(
            event =>
                isEqual(event.start, oldDate) && !event.id.includes('freeday')
        )

        if (!!hasOldFreeDay && !isEmptyDay) {
            calendar.addEvent(hasOldFreeDay)
        }

        !!eventDrop && eventDrop(e)
    }

    const colors = useMemo(
        () => ({
            viewed: {
                color: theme.colors['primary-2'],
                textColor: theme.colors['primary-5']
            },
            unseen: {
                color: theme.colors.burgundy[0],
                textColor: theme.colors.burgundy[2]
            },
            live: {
                color: theme.colors.grey[0],
                textColor: theme.colors.grey[6]
            },
            exams: {
                color: theme.colors.blue[0],
                textColor: theme.colors.blue[3]
            }
        }),
        []
    )

    const freeDays = useMemo(() => getFreeDays(), [])

    const eventsMap = useMemo(
        () => [
            ...events.map(event => ({
                ...event,
                ...colors[event.status],
                allDay: true,
                classNames: !!event.start &&
                    isPast(event.start) && ['san-past-event']
            })),
            ...freeDays.filter(
                free =>
                    !events.find(event => isSameDay(event.start, free.start))
            )
        ],
        [events, freeDays]
    )

    useImperativeHandle(ref, () => calendarRef.current)

    return (
        <FullCalendarWrapper>
            <SANSpin spinning={loading} flex>
                <FullCalendar
                    height={width < 768 && 650}
                    fixedWeekCount={false}
                    aspectRatio={1.7}
                    events={eventsMap}
                    ref={calendarRef}
                    locale={ptLocale}
                    defaultView='dayGridMonth'
                    plugins={[dayGridPlugin, interactionPlugin]}
                    header={{
                        left: 'prev',
                        right: 'next',
                        center: 'title'
                    }}
                    datesRender={handleChangeMonth}
                    eventLimit
                    eventLimitText={n => `${t('bigCalendar.more')} ${n}`}
                    eventDrop={handleEventDrop}
                    {...props}
                />
            </SANSpin>
        </FullCalendarWrapper>
    )
}

export default forwardRef(SANBigCalendar)
