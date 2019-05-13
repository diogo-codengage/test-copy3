import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Layout, Radio, Badge } from 'antd'
import ESMainMenu from './MainMenu'
import ESLeftOff from './Initial/LeftOff'
import ESNavigationList from './NavigationList/NavigationList'
import ESNavigationListItem from './NavigationList/NavigationListItem'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESBadge from '../../Atoms/Badge'

const { Content, Footer } = Layout
const RadioGroup = Radio.Group

const menuItems = [
    { title: 'INÍCIO', icon: 'home-outline' },
    { title: 'NOTIFICAÇÕES', icon: 'bell-outline' },
    { title: 'CRONOGRAMA', icon: 'calendar-outline' },
    { title: 'SALVOS', icon: 'heart-outline' },
    { title: 'DESEMPENHO', icon: 'pie-chart-outline' },
    { title: 'QUESTÕES', icon: 'edit-outline' },
    { title: 'TROCAR DE CURSO', icon: 'swap-outline' },
    { title: 'MINHA CONTA', icon: 'person-outline' }
]

const LayoutExample = ({ value, setValue }) => (
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
                    onChange={e => setValue(e.target.value)}
                    value={value}
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

const DemoMainMenu = () => {
    const [value, setValue] = useState('primary')

    return (
        <Layout style={{ flexDirection: 'row', height: '100%' }}>
            <ESMainMenu title='Menu' theme={value}>
                <ESLeftOff
                    title='Trilha Sanar Enfermagem'
                    classReference='Nome da aula exemplo'
                    moduleReference='Módulo 2, aula 5'
                    thumbnail='https://www.e-sanar.com.br/fotos/esanar_noticias/83/mg/esanar-avatar-matheus_jpeg.jpg'
                />
                <ESNavigationList onClick={action('clicked')}>
                    <ESNavigationListItem
                        key='0'
                        title='INÍCIO'
                        icon={<ESEvaIcon name='home-outline' color='default' />}
                    />
                    <ESNavigationListItem
                        key='1'
                        title='NOTIFICAÇÕES'
                        icon={
                            <ESBadge dot border={false} style={{ right: 10 }}>
                                <ESEvaIcon
                                    name='bell-outline'
                                    color='default'
                                />
                            </ESBadge>
                        }
                    />
                    <ESNavigationListItem
                        key='2'
                        title='CRONOGRAMA'
                        icon={
                            <ESEvaIcon
                                name='calendar-outline'
                                color='default'
                            />
                        }
                    />
                    <ESNavigationListItem
                        key='3'
                        title='SALVOS'
                        icon={
                            <ESEvaIcon name='heart-outline' color='default' />
                        }
                    />
                    <ESNavigationListItem
                        key='4'
                        title='DESEMPENHO'
                        icon={
                            <ESEvaIcon
                                name='pie-chart-outline'
                                color='default'
                            />
                        }
                    />
                    <ESNavigationListItem
                        key='5'
                        title='QUESTÕES'
                        icon={<ESEvaIcon name='edit-outline' color='default' />}
                    />
                    <ESNavigationListItem
                        key='6'
                        title='TROCAR DE CURSO'
                        icon={<ESEvaIcon name='swap-outline' color='default' />}
                    />
                    <ESNavigationListItem
                        key='7'
                        title='MINHA CONTA'
                        icon={
                            <ESEvaIcon name='person-outline' color='default' />
                        }
                    />
                </ESNavigationList>
            </ESMainMenu>
            <LayoutExample {...{ value, setValue }} />
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
