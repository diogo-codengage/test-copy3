import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

import { Layout, Radio } from 'antd'
import ESMainMenu from './MainMenu'
import ESLeftOff from './Initial/LeftOff'

const { Content, Footer } = Layout
const RadioGroup = Radio.Group

const LayoutExample = ({ value }) => (
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
