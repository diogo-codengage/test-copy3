import React, { useMemo } from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'

import { Scrollbars } from 'react-custom-scrollbars'

import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import SANFooter from './Footer'
import SANMenu from './Menu'
import { useLayoutContext, withLayoutProvider } from './Context'

const SANPortalLayout = ({ children }) => {
    const { darkMode } = useLayoutContext()
    const { width } = useWindowSize()

    const classes = classNames('san-portal-layout', {
        'san-portal-layout--continue-bar': true,
        'san-portal-layout__classroom': darkMode
    })

    const classesScrollArea = classNames('san-portal-layout__scroll', {
        'san-portal-layout__scroll__classroom': darkMode
    })

    const hasHeaderMobile = useMemo(() => width <= 1024, [width])

    return (
        <Layout className={classes}>
            <SANMenu showContinueBar />
            <Layout>
                {hasHeaderMobile && <ESBrandHeader darkMode={darkMode} />}
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
