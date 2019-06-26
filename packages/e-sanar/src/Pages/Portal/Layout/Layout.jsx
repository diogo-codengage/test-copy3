import React from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'

import { Scrollbars } from 'react-custom-scrollbars'

import SANFooter from './Footer'
import SANMenu from './Menu'
import {
    SANLayoutProvider,
    useLayoutContext,
    withLayoutProvider
} from './Context'

const SANPortalLayout = ({ children }) => {
    const { darkMode } = useLayoutContext()

    const classes = classNames('san-portal-layout', {
        'san-portal-layout--continue-bar': true
    })

    const classesScrollArea = classNames('san-portal-layout__scroll', {
        'san-portal-layout__scroll__classroom': darkMode
    })

    return (
        <Layout className={classes}>
            <SANMenu showContinueBar />
            <Layout>
                <Scrollbars renderTrackHorizontal={() => <div />}>
                    <div className={classesScrollArea}>
                        <Layout.Content className='san-portal-layout__content'>
                            {children}
                        </Layout.Content>
                        <SANFooter darkMode={darkMode} />
                    </div>
                </Scrollbars>
            </Layout>
        </Layout>
    )
}

export default withLayoutProvider(SANPortalLayout)
