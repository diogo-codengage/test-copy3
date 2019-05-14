import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Layout, Radio } from 'antd'
import ESMainMenu from './MainMenu'
import ESLeftOff from './LeftOff/LeftOff'
import ESAvatarMenu from './Avatar/Avatar'
import ESNotification from './Notification/Notification'
import ESNavigationList from './NavigationList/NavigationList'
import ESNavigationListItem from './NavigationList/NavigationListItem'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESBadge from '../../Atoms/Badge'
import ESButton from '../../Atoms/Button'
import ESDivider from '../../Atoms/Divider'
import ESTypography from '../../Atoms/Typography'
import ESTabs, { ESTabPane } from '../../Atoms/Tabs'

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
                <div className='pl-md pr-md pb-md'>
                    <ESNotification
                        type='react'
                        text={`Ensure your most important links are available at the high level, and links that are a level deeper are relevant and impactful to more niche users`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                        user='Adré Cabral'
                    />
                    <ESNotification
                        type='live'
                        text={`A live sobre Saúde pública já vai começar.`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                    />
                    <ESNotification
                        type='late'
                        text={`Você está atrasado com suas atividades desta semana.`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                    />
                </div>
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
                <div className='pl-md pr-md pb-md'>
                    <ESNotification
                        read
                        type='react'
                        text={`Ensure your most important links are available at the high level, and links that are a level deeper are relevant and impactful to more niche users`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                        user='Adré Cabral'
                    />
                    <ESNotification
                        read
                        type='live'
                        text={`A live sobre Saúde pública já vai começar.`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                    />
                    <ESNotification
                        read
                        type='late'
                        text={`Você está atrasado com suas atividades desta semana.`}
                        time='2 horas atrás'
                        markAsRead={action('markAsRead')}
                        markAsUnread={action('markAsUnread')}
                    />
                </div>
            </ESTabPane>
        </ESTabs>
    </>
)

const DemoMainMenu = () => {
    const [theme, setTheme] = useState('primary')
    const [index, setIndex] = useState(0)

    return (
        <Layout style={{ flexDirection: 'row', height: '100%' }}>
            <ESMainMenu title='Menu' theme={theme}>
                {index === 0 && <Initial {...{ setIndex }} />}
                {index === 1 && <Notifications {...{ setIndex }} />}
                {index === 7 && <MyAccount {...{ setIndex }} />}
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
