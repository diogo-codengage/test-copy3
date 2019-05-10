import React from 'react'
import { Layout } from 'antd'

import { Scrollbars } from 'react-custom-scrollbars'

import ESMainMenu from 'sanar-ui/dist/Components/Organisms/MainMenu'

import SANFooter from './Footer'

const SANPortalLayout = ({ children }) => (
    <Layout className='san-portal-layout'>
        <ESMainMenu title='Menu' />
        <Layout>
            <Scrollbars renderTrackHorizontal={() => <div />}>
                <Layout.Content className='san-portal-layout__content'>
                    {children}
                </Layout.Content>
                <SANFooter />
            </Scrollbars>
        </Layout>
    </Layout>
)

export default SANPortalLayout
