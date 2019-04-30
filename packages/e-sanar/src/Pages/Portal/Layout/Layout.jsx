import React, { useState } from 'react'
import { Layout } from 'antd'

const { Sider, Footer } = Layout

const SANPortalLayout = ({ children }) => {
    const [hasSider, collapse] = useState(window.innerWidth >= 992)

    return (
        <Layout className='san-portal-layout'>
            <Sider
                style={{
                    background: 'rgba(37, 90, 208, 1)'
                }}
                theme='light'
                collapsed={hasSider}
                collapsedWidth={0}
                breakpoint={'xl'}
                onBreakpoint={() => collapse(!hasSider)}
            />
            <Layout>
                {children}
                <Footer />
            </Layout>
        </Layout>
    )
}

export default SANPortalLayout
