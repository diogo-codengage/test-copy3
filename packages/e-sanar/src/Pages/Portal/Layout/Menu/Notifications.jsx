import React from 'react'

import { useTranslation } from 'react-i18next'

import { ESNotification } from 'sanar-ui/dist/Components/Organisms/MainMenu'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'

const intlPath = 'mainMenu.notifications.'

const SANNotifications = ({ setTab }) => {
    const { t } = useTranslation()

    return (
        <>
            <div className='pl-md pr-md mb-md'>
                <ESButton
                    className='mb-md'
                    size='xsmall'
                    variant='outlined'
                    color='white'
                    block
                    onClick={() => setTab(0)}
                >
                    <ESEvaIcon name='arrow-back-outline' />
                    {t('mainMenu.back')}
                </ESButton>
            </div>

            <ESTabs size='small' tabBarGutter={0} center defaultActiveKey='1'>
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
                        >
                            {t(`${intlPath}markAllRead`)}
                        </ESButton>
                    </div>
                    <div className='pl-md pr-md pb-md'>
                        <ESNotification
                            icon='interaction'
                            action='Adré Cabral reagiu ao seu comentário'
                            text={`Ensure your most important links are available at the high level, and links that are a level deeper are relevant and impactful to more niche users`}
                            time='2 horas atrás'
                            markAsRead={console.log}
                            markAsUnread={console.log}
                            user='Adré Cabral'
                            labelMarkAsRead={t(`${intlPath}markRead`)}
                            labelMarkAsUnead={t(`${intlPath}markUnread`)}
                        />
                        <ESNotification
                            action='Aula nova adicionada'
                            icon='new'
                            type='medium'
                            text={`A live sobre Saúde pública já vai começar.`}
                            time='2 horas atrás'
                            markAsRead={console.log}
                            markAsUnread={console.log}
                        />
                        <ESNotification
                            action='Mapa mental atualizado'
                            icon='update'
                            type='high'
                            text={`Você está atrasado com suas atividades desta semana.`}
                            time='2 horas atrás'
                            markAsRead={console.log}
                            markAsUnread={console.log}
                        />
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
                        >
                            {t(`${intlPath}excludeRlreadyRead`)}
                        </ESButton>
                    </div>
                    <div className='pl-md pr-md pb-md'>
                        <ESNotification
                            read
                            action='Desempenho positivo'
                            icon='performance'
                            text={`Ensure your most important links are available at the high level, and links that are a level deeper are relevant and impactful to more niche users`}
                            time='2 horas atrás'
                            markAsRead={console.log}
                            markAsUnread={console.log}
                            user='Adré Cabral'
                        />
                        <ESNotification
                            read
                            action='Live programada'
                            icon='live'
                            text={`A live sobre Saúde pública já vai começar.`}
                            time='2 horas atrás'
                            markAsRead={console.log}
                            markAsUnread={console.log}
                        />
                        <ESNotification
                            read
                            action='Atividade módulo 4'
                            icon='schedule'
                            text={`Você está atrasado com suas atividades desta semana.`}
                            time='2 horas atrás'
                            markAsRead={console.log}
                            markAsUnread={console.log}
                        />
                        <ESNotification
                            read
                            action='Termos legais atualizados'
                            icon='general'
                            text={`Você está atrasado com suas atividades desta semana.`}
                            time='2 horas atrás'
                            markAsRead={console.log}
                            markAsUnread={console.log}
                        />
                    </div>
                </ESTabPane>
            </ESTabs>
        </>
    )
}

export default SANNotifications
