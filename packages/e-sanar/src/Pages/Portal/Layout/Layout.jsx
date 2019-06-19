import React from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'

import SANFooter from './Footer'
import SANMenu from './Menu'

const SANPortalLayout = ({ children }) => {
    const classes = classNames('san-portal-layout', {
        'san-portal-layout--continue-bar': true
    })

    return (
        <Layout className={classes}>
            <SANMenu showContinueBar />
            <Layout className='san-portal-layout__content'>
                <Layout.Content>{children}</Layout.Content>
                <SANFooter />
            </Layout>
        </Layout>
    )
}

export default SANPortalLayout
