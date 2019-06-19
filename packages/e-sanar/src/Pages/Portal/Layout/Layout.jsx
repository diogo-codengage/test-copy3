import React from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'

import SANFooter from './Footer'
import SANMenu from './Menu'
import { DarkProvider } from './Context';

const SANPortalLayout = ({ children }) => {
    const classes = classNames('san-portal-layout', {
        'san-portal-layout--continue-bar': true
    })

    return (
        <DarkProvider>
            <Layout className={classes}>
                <SANMenu showContinueBar />
                <Layout>
                    <Layout.Content className='san-portal-layout__content'>
                        {children}
                    </Layout.Content>
                    <SANFooter />
                </Layout>
            </Layout>
        </DarkProvider>
    )
}

export default SANPortalLayout
