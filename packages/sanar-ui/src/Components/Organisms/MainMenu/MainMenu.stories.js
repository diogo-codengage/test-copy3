import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

import { Layout, Radio, Input } from 'antd'
import ESMainMenu from './MainMenu'

const { Content, Footer } = Layout
const RadioGroup = Radio.Group

const DemoMainMenu = () => {
    const [value, setValue] = useState('primary')

    return (
        <Layout style={{ flexDirection: 'row', height: '100%' }}>
            <ESMainMenu title='Menu' theme={value} />
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
