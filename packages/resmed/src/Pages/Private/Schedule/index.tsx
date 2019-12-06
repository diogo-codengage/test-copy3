import React, { useState } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'

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
    SANLayoutContainer,
    SANSessionTitle,
    SANCardEvent
} from '@sanar/components'
import { IEvent } from '@sanar/components/dist/Components/Organisms/BigCalendar'

import {
    RMModalSchedule,
    RMModalSuggestion,
    RMModalMore,
    IOption
} from './Modal'

const lesson = {
    extendedProps: {
        type: 'lesson',
        status: 'viewed',
        title: 'Nome da aula',
        subtitle: '15:00',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta non pulvinar. Hendrerit dolor magna eget est lorem ipsum dolor sit.'
    }
}

const live = {
    extendedProps: {
        type: 'live',
        title: 'Live de Correção da prova SUS-SP 2019 - Parte 1',
        subtitle: '15:00',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta non pulvinar. Hendrerit dolor magna eget est lorem ipsum dolor sit.'
    }
}

const exam = {
    extendedProps: {
        type: 'exam',
        status: 'exams',
        title: 'Inscrição para a prova Lorem ipsum'
    }
}

const events: IEvent[] = [
    {
        id: '1',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 2),
        status: 'viewed',
        ...lesson
    },
    {
        id: '2',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 2),
        status: 'exams',
        ...exam
    },
    {
        id: '3',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 5),
        status: 'viewed',
        startEditable: true,
        ...lesson
    },
    {
        id: '4',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 5),
        status: 'exams',
        startEditable: true,
        ...exam
    },
    {
        id: '5',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 6),
        status: 'viewed',
        startEditable: true,
        ...lesson
    },
    {
        id: '6',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true,
        ...exam
    },
    {
        id: '7',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 6),
        status: 'viewed',
        startEditable: true,
        ...lesson
    },
    {
        id: '8',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true,
        ...exam
    },
    {
        id: '9',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true,
        ...exam
    },
    {
        id: '10',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true,
        ...exam
    },
    {
        id: '11',
        title: 'Aulas não vistas',
        start: new Date(2019, 11, 4, 23, 59),
        status: 'unseen',
        startEditable: true,
        ...lesson
    },
    {
        id: '11',
        title: 'Aulas não vistas lorem ipsum',
        start: new Date(2019, 11, 26),
        status: 'unseen',
        startEditable: true,
        ...lesson
    },
    {
        id: '12',
        title: 'Live',
        start: new Date(2019, 11, 2),
        status: 'live',
        ...live
    },
    {
        id: '13',
        title: 'Live',
        start: new Date(2019, 11, 6),
        status: 'live',
        ...live
    }
]

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

const RMSchedule = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')
    const [modalSchedule, setModalSchedule] = useState<{
        visible: boolean
        options: IOption | any
    }>({
        visible: false,
        options: {}
    })
    const [modalSuggestion, setModalSuggestion] = useState({
        visible: false,
        checked: false
    })
    const [modalMore, setModalMore] = useState<{
        visible: boolean
        options: IOption[] | []
    }>({
        visible: false,
        options: []
    })

    const handleEventLimitClick = e => {
        setModalMore({
            visible: true,
            options: e.segs.map(seg => seg.eventRange.def.extendedProps)
        })
    }

    const handleEventClick = e =>
        setModalSchedule({ visible: true, options: e.event.extendedProps })

    const handleChangeSuggestion = checked =>
        setModalSuggestion({ checked, visible: true })

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
                    setModalSuggestion({ checked: false, visible: false })
                }
                onConfirm={() =>
                    setModalSuggestion({ checked: true, visible: false })
                }
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
                                events={events}
                                eventClick={handleEventClick}
                                eventLimitClick={handleEventLimitClick}
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
                                <SANSessionTitle
                                    title={t('schedule.today')}
                                    subtitle={
                                        <SANTypography
                                            transform='uppercase'
                                            color='grey.5'
                                            fontWeight='bold'
                                        >
                                            {new Date().toLocaleDateString(
                                                'pt-BR',
                                                {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }
                                            )}
                                        </SANTypography>
                                    }
                                />
                                <SANCardEvent
                                    title='Inscrição para a prova tal'
                                    date='12/06/2019, às 10h até 12/07/2019, às 18h'
                                    type='exams'
                                    mb='xs'
                                />
                                <SANCardEvent
                                    title='Live de Correção da prova SUS-SP 2019'
                                    date='14:00'
                                    type='live'
                                    mb='xs'
                                />
                                <SANCardEvent
                                    title='Aula'
                                    date='9:30 até 10:30'
                                    type='views'
                                    mb='xs'
                                />
                                <SANCardEvent
                                    title='Aula'
                                    date='9:30 até 10:30'
                                    type='unseen'
                                />
                            </SANCol>
                            <SANCol xs={24} sm={24} md={12}>
                                <SANSessionTitle
                                    title={t('schedule.thisWeek.title')}
                                    subtitle={
                                        <SANTypography
                                            color='grey.5'
                                            fontWeight='bold'
                                        >
                                            {t('schedule.thisWeek.subtitle')}
                                        </SANTypography>
                                    }
                                    mt={{ md: '0', _: 'xl' }}
                                />
                                <SANCardEvent
                                    title='Aula'
                                    date='9:30 até 10:30'
                                    type='unseen'
                                    mb='xs'
                                />
                                <SANCardEvent
                                    title='Inscrição para a prova tal'
                                    date='12/06/2019, às 10h até 12/07/2019, às 18h'
                                    type='exams'
                                />
                            </SANCol>
                        </SANRow>
                    </SANLayoutContainer>
                </SANBox>
            </SANPage>
        </>
    )
}

export default withRouter<RouteComponentProps>(RMSchedule)
