import React, { useMemo } from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'

import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import SANFooter from './Footer'
import SANMenu from './Menu'
import { useLayoutContext, withLayoutProvider } from './Context'

const withoutContinueBar = ['classroom', 'questionPractice']

const SANPortalLayout = ({ children }) => {
    const { pageContext, darkMode } = useLayoutContext()
    const { width } = useWindowSize()

    const classes = classNames('san-portal-layout', {
        'san-portal-layout--continue-bar': !withoutContinueBar.includes(
            pageContext
        ),
        'san-portal-layout__classroom': pageContext === 'classroom'
    })

    const classesContent = classNames('san-portal-layout__content', {
        'san-portal-layout__content__classroom': pageContext === 'classroom'
    })

    const hasHeaderMobile = useMemo(() => width <= 1024, [width])

    return (
        <Layout className={classes}>
            <SANMenu showContinueBar />
            <Layout className={classesContent}>
                {hasHeaderMobile && <ESBrandHeader darkMode={darkMode} />}

                <Layout.Content className='d-flex flex-column'>
                    {children}
                </Layout.Content>
                <SANFooter darkMode={darkMode} />
            </Layout>
        </Layout>
    )
}

export default withLayoutProvider(SANPortalLayout)
