import React, { useState } from 'react'

import { format } from 'date-fns'
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

import { RMModalSchedule, RMModalSuggestion } from './Modal'

const lesson = {
    extendedProps: {
        type: 'lesson',
        completed: true,
        title: 'Nome da aula',
        subtitle: '15:00',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta non pulvinar. Hendrerit dolor magna eget est lorem ipsum dolor sit. Cum sociis natoque penatibus et magnis dis parturient montes nascetur. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Natoque penatibus et magnis dis parturient montes nascetur. Platea dictumst vestibulum rhoncus est pellentesque. Convallis convallis tellus id interdum velit laoreet id. Nisl nisi scelerisque eu ultrices vitae. Ac turpis egestas integer eget. Id velit ut tortor pretium viverra suspendisse. Urna neque viverra justo nec ultrices.'
    }
}

const live = {
    extendedProps: {
        type: 'live',
        title: 'Live de Correção da prova SUS-SP 2019 - Parte 1',
        subtitle: '15:00',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta non pulvinar. Hendrerit dolor magna eget est lorem ipsum dolor sit. Cum sociis natoque penatibus et magnis dis parturient montes nascetur. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Natoque penatibus et magnis dis parturient montes nascetur. Platea dictumst vestibulum rhoncus est pellentesque. Convallis convallis tellus id interdum velit laoreet id. Nisl nisi scelerisque eu ultrices vitae. Ac turpis egestas integer eget. Id velit ut tortor pretium viverra suspendisse. Urna neque viverra justo nec ultrices.'
    }
}

const events = [
    {
        id: '1',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 2),
        status: 'views',
        ...lesson
    },
    {
        id: '2',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 2),
        status: 'exams'
    },
    {
        id: '3',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 5),
        status: 'views',
        startEditable: true,
        ...lesson
    },
    {
        id: '4',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 5),
        status: 'exams',
        startEditable: true
    },
    {
        id: '5',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 6),
        status: 'views',
        startEditable: true,
        ...lesson
    },
    {
        id: '6',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true
    },
    {
        id: '7',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 6),
        status: 'views',
        startEditable: true,
        ...lesson
    },
    {
        id: '8',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true
    },
    {
        id: '9',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true
    },
    {
        id: '10',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true
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
    const [modalSchedule, setModalSchedule] = useState({
        visible: false,
        options: {}
    })
    const [modalSuggestion, setModalSuggestion] = useState({
        visible: false,
        checked: false
    })

    const handleEventClick = e =>
        setModalSchedule({ visible: true, options: e.event.extendedProps })

    const handleChangeSuggestion = checked => {
        setModalSuggestion({ checked, visible: true })
    }

    return (
        <>
            <RMModalSchedule
                {...modalSchedule}
                onCancel={() =>
                    setModalSchedule({ options: {}, visible: false })
                }
                onClick={() =>
                    setModalSchedule({ options: {}, visible: false })
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
                                        >
                                            {format(new Date(), 'DD/MM/YYYY')}
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
                                    subtitle={t('schedule.thisWeek.subtitle')}
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
