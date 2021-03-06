import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'

import {
    ESNotificationList,
    ESNotificationItem,
    ESNotificationEmpty
} from 'sanar-ui/dist/Components/Organisms/MainMenu'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'

const intlPath = 'mainMenu.notifications.'

const notificationsRead = [
    {
        icon: 'interaction',
        action: 'Adré Cabral reagiu ao seu comentário',
        text: `Ensure your most important links are available at the high level, and links that are a level deeper are relevant and impactful to more niche users`,
        time: '2 horas atrás',
        user: 'Adré Cabral'
    },
    {
        action: 'Aula nova adicionada',
        icon: 'new',
        type: 'medium',
        text: `A live sobre Saúde pública já vai começar.`,
        time: '2 horas atrás'
    },
    {
        action: 'Mapa mental atualizado',
        icon: 'update',
        type: 'high',
        text: `Você está atrasado com suas atividades desta semana.`,
        time: '2 horas atrás'
    }
]

const notificationsUnread = [
    {
        read: true,
        action: 'Desempenho positivo',
        icon: 'performance',
        text: `Ensure your most important links are available at the high level, and links that are a level deeper are relevant and impactful to more niche users`,
        time: '2 horas atrás',
        user: 'Adré Cabral'
    },
    {
        read: true,
        action: 'Live programada',
        icon: 'live',
        text: `A live sobre Saúde pública já vai começar.`,
        time: '2 horas atrás'
    },
    {
        read: true,
        action: 'Atividade módulo 4',
        icon: 'schedule',
        text: `Você está atrasado com suas atividades desta semana.`,
        time: '2 horas atrás'
    },
    {
        read: true,
        action: 'Termos legais atualizados',
        icon: 'general',
        text: `Você está atrasado com suas atividades desta semana.`,
        time: '2 horas atrás'
    }
]

const Notification = ({ ...props }) => {
    const { t } = useTranslation('esanar')
    return (
        <ESNotificationItem
            {...props}
            labelMarkAsRead={t(`${intlPath}markRead`)}
            labelMarkAsUnread={t(`${intlPath}markUnread`)}
        />
    )
}

const SANNotifications = ({ handleBack }) => {
    const { t } = useTranslation('esanar')
    const [reads, setReads] = useState(notificationsRead)
    const [unreads, setUnreads] = useState(notificationsUnread)

    return (
        <>
            <div className='pl-md pr-md mb-md'>
                <ESButton
                    className='mb-md'
                    size='xsmall'
                    variant='outlined'
                    color='white'
                    block
                    onClick={handleBack}
                >
                    <ESEvaIcon name='arrow-back-outline' />
                    {t('mainMenu.back')}
                </ESButton>
            </div>

            {reads.length || unreads.length ? (
                <ESTabs
                    size='small'
                    tabBarGutter={0}
                    center
                    defaultActiveKey='1'
                >
                    <ESTabPane
                        tab={
                            <ESTypography strong variant='subtitle2'>
                                {t(`${intlPath}notRead`)}
                            </ESTypography>
                        }
                        key='1'
                    >
                        <div className='pl-md pr-md pb-md d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <ESTypography
                                    className='mr-xs'
                                    strong
                                    variant='caption'
                                >
                                    3
                                </ESTypography>
                                <ESTypography variant='caption'>
                                    {t(`${intlPath}notRead`)}
                                </ESTypography>
                            </div>
                            <ESButton
                                size='xsmall'
                                bold
                                color='white'
                                variant='text'
                                onClick={() => setReads([])}
                            >
                                {t(`${intlPath}markAllRead`)}
                            </ESButton>
                        </div>
                        <div className='pl-md pr-md pb-md'>
                            <ESNotificationList>
                                {reads.length ? (
                                    reads.map((e, i) => (
                                        <CSSTransition
                                            timeout={500}
                                            classNames='read'
                                            key={e.icon}
                                        >
                                            <Notification
                                                {...e}
                                                markAsRead={() =>
                                                    setReads(
                                                        reads.filter(
                                                            (e, a) => i !== a
                                                        )
                                                    )
                                                }
                                            />
                                        </CSSTransition>
                                    ))
                                ) : (
                                    <ESNotificationEmpty />
                                )}
                            </ESNotificationList>
                        </div>
                    </ESTabPane>
                    <ESTabPane
                        tab={
                            <ESTypography strong variant='subtitle2'>
                                {t(`${intlPath}alreadyRead`)}
                            </ESTypography>
                        }
                        key='2'
                    >
                        <div className='pl-md pr-md pb-md d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <ESTypography
                                    className='mr-xs'
                                    strong
                                    variant='caption'
                                >
                                    3
                                </ESTypography>
                                <ESTypography variant='caption'>
                                    {t(`${intlPath}alreadyRead`)}
                                </ESTypography>
                            </div>
                            <ESButton
                                size='xsmall'
                                bold
                                color='white'
                                variant='text'
                                onClick={() => setUnreads([])}
                            >
                                {t(`${intlPath}excludeRlreadyRead`)}
                            </ESButton>
                        </div>
                        <div className='pl-md pr-md pb-md'>
                            <ESNotificationList>
                                {unreads.length ? (
                                    unreads.map((e, i) => (
                                        <CSSTransition
                                            timeout={500}
                                            classNames='unread'
                                            key={e.icon}
                                        >
                                            <Notification
                                                {...e}
                                                markAsUnread={() =>
                                                    setUnreads(
                                                        unreads.filter(
                                                            (e, a) => i !== a
                                                        )
                                                    )
                                                }
                                            />
                                        </CSSTransition>
                                    ))
                                ) : (
                                    <ESNotificationEmpty />
                                )}
                            </ESNotificationList>
                        </div>
                    </ESTabPane>
                </ESTabs>
            ) : (
                <ESNotificationEmpty />
            )}
        </>
    )
}

export default SANNotifications
