import React from 'react'
import { Layout } from 'antd'

import { Scrollbars } from 'react-custom-scrollbars'

import SANFooter from './Footer'
import SANMenu from './Menu'

const SANPortalLayout = ({ children }) => (
    <Layout className='san-portal-layout'>
        <SANMenu />
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
