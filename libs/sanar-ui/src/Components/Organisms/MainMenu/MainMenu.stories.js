import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { useTranslation } from 'react-i18next'

import { Layout, Radio } from 'antd'
import ESMainMenu from './MainMenu'
import ESRanking from './Ranking/Ranking'
import ESLeftOff from './LeftOff/LeftOff'
import ESAvatarMenu from './Avatar/Avatar'
import ESNotificationList from './Notification/NotificationList'
import ESNotificationItem from './Notification/NotificationItem'
import ESNavigationList from './NavigationList/NavigationList'
import ESNavigationListItem from './NavigationList/NavigationListItem'
import ESSearch from './Search/Search'
import ESListSearch from './ListSearch/ListSearch'
import ESListSearchItem from './ListSearch/ListSearchItem'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESBadge from '../../Atoms/Badge'
import ESButton from '../../Atoms/Button'
import ESDivider from '../../Atoms/Divider'
import ESTypography from '../../Atoms/Typography'
import ESTabs, { ESTabPane } from '../../Atoms/Tabs'
import ESChangeCourse from '../../Molecules/ChangeCourse'
import ESSelect, { ESOption } from '../../Atoms/Select'

const { Content, Footer } = Layout
const RadioGroup = Radio.Group

const LayoutExample = ({ theme, setTheme }) => (
    <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
            <div
                style={{
                    background: 'rgba(0, 0, 0, .1)',
                    minHeight: 360,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <RadioGroup
                    onChange={e => setTheme(e.target.value)}
                    value={theme}
                >
                    <Radio value={'primary'}>Primary</Radio>
                    <Radio value={'dark'}>Dark</Radio>
                    <Radio value={'light'}>Light</Radio>
                </RadioGroup>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            E-Sanar ©2019 Created by Codengage
        </Footer>
    </Layout>
)

const Initial = ({ setIndex }) => (
    <>
        <div className='pl-md pr-md mb-md'>
            <ESRanking
                ranking={120}
                score={56007}
            />
        </div>
        <div className='pl-md pr-md'>
            <ESLeftOff
                title='Trilha Sanar Enfermagem'
                classReference='Nome da aula exemplo'
                moduleReference='Módulo 2, aula 5'
                thumbnail='https://www.e-sanar.com.br/fotos/esanar_noticias/83/mg/esanar-avatar-matheus_jpeg.jpg'
            />
        </div>
        <ESNavigationList onClick={e => setIndex(Number(e.key))}>
            <ESNavigationListItem
                key={0}
                title='INÍCIO'
                icon={<ESEvaIcon name='home-outline' color='default' />}
            />
            <ESNavigationListItem
                key={1}
                title='NOTIFICAÇÕES'
                icon={
                    <ESBadge dot border={false} style={{ right: 10 }}>
                        <ESEvaIcon name='bell-outline' color='default' />
                    </ESBadge>
                }
            />
            <ESNavigationListItem
                key={2}
                title='CRONOGRAMA'
                icon={<ESEvaIcon name='calendar-outline' color='default' />}
            />
            <ESNavigationListItem
                key={3}
                title='SALVOS'
                icon={<ESEvaIcon name='heart-outline' color='default' />}
            />
            <ESNavigationListItem
                key={4}
                title='DESEMPENHO'
                icon={<ESEvaIcon name='pie-chart-outline' color='default' />}
            />
            <ESNavigationListItem
                key={5}
                title='QUESTÕES'
                icon={<ESEvaIcon name='edit-outline' color='default' />}
            />
            <ESNavigationListItem
                key={6}
                title='TROCAR DE CURSO'
                icon={<ESEvaIcon name='swap-outline' color='default' />}
            />
            <ESNavigationListItem
                key={7}
                title='MINHA CONTA'
                icon={<ESEvaIcon name='person-outline' color='default' />}
            />
        </ESNavigationList>
    </>
)

const MyAccount = ({ setIndex }) => (
    <>
        <div className='pl-md pr-md mb-md'>
            <ESButton
                className='mb-md'
                size='xsmall'
                variant='outlined'
                color='white'
                block
                onClick={() => setIndex(0)}
            >
                <ESEvaIcon name='arrow-back-outline' />
                Voltar ao menu principal
            </ESButton>
            <ESAvatarMenu
                src='https://cdn-images-1.medium.com/fit/c/200/200/0*XlT1iL_rE4s6_sa2.jpg'
                title='Diogo Biz'
                subtitle='Enfermagem'
            />
        </div>

        <ESTypography className='text-white-6 pl-md pr-md' variant='overline'>
            GERENCIAMENTO
        </ESTypography>
        <ESNavigationList onClick={action('clicked')}>
            <ESNavigationListItem
                key='0'
                title='MEUS DADOS'
                icon={<ESEvaIcon name='folder-outline' color='default' />}
            />
            <ESNavigationListItem
                key='1'
                title='TROCAR MINHA SENHA'
                icon={<ESEvaIcon name='lock-outline' color='default' />}
            />
        </ESNavigationList>
        <div className='pl-md pr-md'>
            <ESDivider className='mt-md mb-md' />
        </div>
        <ESTypography className='text-white-6 pl-md pr-md' variant='overline'>
            AJUDA
        </ESTypography>
        <ESNavigationList onClick={action('clicked')}>
            <ESNavigationListItem
                key='0'
                title='ENVIAR FEEDBACK'
                icon={<ESEvaIcon name='email-outline' color='default' />}
            />
            <ESNavigationListItem
                key='1'
                title='CENTRAL DE AJUDA'
                icon={
                    <ESEvaIcon
                        name='question-mark-circle-outline'
                        color='default'
                    />
                }
            />
        </ESNavigationList>
        <div className='pl-md pr-md'>
            <ESDivider className='mt-md mb-md' />
        </div>
        <ESTypography className='text-white-6 pl-md pr-md' variant='overline'>
            OUTROS LINKS
        </ESTypography>
        <ESNavigationList onClick={action('clicked')}>
            <ESNavigationListItem key='0' title='TERMOS DE USO' arrow={false} />
            <ESNavigationListItem
                key='1'
                title='POLÍTICA DE PRIVACIDADE'
                arrow={false}
            />
            <ESNavigationListItem key='2' title='SAIR DA CONTA' arrow={false} />
        </ESNavigationList>
    </>
)

const Notifications = ({ setIndex }) => (
    <>
        <div className='pl-md pr-md mb-md'>
            <ESButton
                className='mb-md'
                size='xsmall'
                variant='outlined'
                color='white'
                block
                onClick={() => setIndex(0)}
            >
                <ESEvaIcon name='arrow-back-outline' />
                Voltar ao menu principal
            </ESButton>
        </div>

        <ESTabs size='small' tabBarGutter={0} center defaultActiveKey='1'>
            <ESTabPane
                tab={
                    <ESTypography strong variant='subtitle2'>
                        Não lidas
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
                        <ESTypography variant='caption'>Não lidas</ESTypography>
                    </div>
                    <ESButton size='xsmall' bold color='white' variant='text'>
                        Marcar todas como lidas
                    </ESButton>
                </div>
                <ESNotificationList className='pl-md pr-md pb-md'>
                    <ESNotificationItem
                        icon='interaction'
                        action='Adré Cabral reagiu ao seu comentário'
                        text={`Ensure your most important links are available at the high level, and links that are a level deeper are relevant and impactful to more niche users`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                        user='Adré Cabral'
                    />
                    <ESNotificationItem
                        action='Aula nova adicionada'
                        icon='new'
                        type='medium'
                        text={`A live sobre Saúde pública já vai começar.`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                    />
                    <ESNotificationItem
                        action='Mapa mental atualizado'
                        icon='update'
                        type='high'
                        text={`Você está atrasado com suas atividades desta semana.`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                    />
                </ESNotificationList>
            </ESTabPane>
            <ESTabPane
                tab={
                    <ESTypography strong variant='subtitle2'>
                        Já lidos
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
                        <ESTypography variant='caption'>Já lidos</ESTypography>
                    </div>
                    <ESButton size='xsmall' bold color='white' variant='text'>
                        Excluir já lidos
                    </ESButton>
                </div>
                <ESNotificationList className='pl-md pr-md pb-md'>
                    <ESNotificationItem
                        read
                        action='Desempenho positivo'
                        icon='performance'
                        text={`Ensure your most important links are available at the high level, and links that are a level deeper are relevant and impactful to more niche users`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                        user='Adré Cabral'
                    />
                    <ESNotificationItem
                        read
                        action='Live programada'
                        icon='live'
                        text={`A live sobre Saúde pública já vai começar.`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                    />
                    <ESNotificationItem
                        read
                        action='Atividade módulo 4'
                        icon='schedule'
                        text={`Você está atrasado com suas atividades desta semana.`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                    />
                    <ESNotificationItem
                        read
                        action='Termos legais atualizados'
                        icon='general'
                        text={`Você está atrasado com suas atividades desta semana.`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                    />
                </ESNotificationList>
            </ESTabPane>
        </ESTabs>
    </>
)

const CourseChange = ({ setIndex }) => (
    <>
        <div className='pl-md pr-md mb-md'>
            <ESButton
                className='mb-md'
                size='xsmall'
                variant='outlined'
                color='white'
                block
                onClick={() => setIndex(0)}
            >
                <ESEvaIcon name='arrow-back-outline' />
                Voltar ao menu principal
            </ESButton>
        </div>
        <ESChangeCourse
            title='Trilha Sanar Enfermagem'
            date='23/05/2020'
            percent={45}
            coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
            icon='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:2eef4ded-78c2-4ef5-abe4-08b602aad71c&params=version:0&token=1558008652_da39a3ee_7a22c22a02018c4fd70f9f9f69150074add489ff&api_key=CometServer1'
            onContinue={console.log}
            module='Continuar no Módulo 2, aula 5'
            description='Per aumento de cachacis, eu reclamis.'
        />
        <div className='pl-md pr-md pt-md pb-md'>
            <ESTypography className='mb-md text-white-9' level={5}>
                Trocar de curso
            </ESTypography>

            <ESSelect
                style={{ width: '100%' }}
                defaultValue='todas'
                placeholder='Filtro'
            >
                <ESOption value='todas'>Todas as áreas</ESOption>
            </ESSelect>
            <ESTypography
                className='mb-md mt-md text-white-8'
                variant='caption'
            >
                Você tem <strong>2</strong> cursos em “Todas as áreas”
            </ESTypography>
            {[0, 1].map(i => (
                <ESChangeCourse
                    key={i}
                    className='mb-md'
                    title='Trilha Sanar Enfermagem'
                    date='23/05/2020'
                    percent={45}
                    arrow
                    round
                    coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
                    icon='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:2eef4ded-78c2-4ef5-abe4-08b602aad71c&params=version:0&token=1558008652_da39a3ee_7a22c22a02018c4fd70f9f9f69150074add489ff&api_key=CometServer1'
                    onChange={console.log}
                />
            ))}
        </div>
    </>
)

const Search = () => (
    <>
        <div className='pl-md pr-md mb-md'>
            <ESSearch className='mb-lg' />
        </div>
        <ESListSearch>
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                <ESListSearchItem title='Ornare interdum maecenas' />
            ))}
        </ESListSearch>
    </>
)

const DemoMainMenu = () => {
    const { t, i18n } = useTranslation('sanarui')
    const [theme, setTheme] = useState('light')
    const [index, setIndex] = useState(0)

    useEffect(() => {index === 6 ? setTheme('dark') : setTheme('primary')}, [
        index
    ])

    return (
        <Layout style={{ flexDirection: 'row', height: '100%' }}>
            <ESMainMenu
                onSearchClick={() => i18n.changeLanguage('en')}
                onInitialClick={() => i18n.changeLanguage('pt')}
                // onSearchClick={() => setIndex(8)}
                // onInitialClick={() => setIndex(0)}
                // title='Menu'
                title={t('mainMenu.leftOff')}
                theme={theme}
            >
                {index === 0 && <Initial {...{ setIndex }} />}
                {index === 1 && <Notifications {...{ setIndex }} />}
                {index === 6 && <CourseChange {...{ setIndex }} />}
                {index === 7 && <MyAccount {...{ setIndex }} />}
                {index === 8 && <Search />}
            </ESMainMenu>
            <LayoutExample {...{ theme, setTheme }} />
        </Layout>
    )
}

storiesOf('Organisms.MainMenu', module).add('Simple', () => <DemoMainMenu />, {
    info: {
        propTablesExclude: [Layout, Footer, Content]
    },
    style: {
        padding: 0,
        height: '100vh'
    }
})
