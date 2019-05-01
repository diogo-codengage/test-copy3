import React, { useState } from 'react'
import { Layout } from 'antd'

const SANPortalLayout = ({ children }) => {
    const [hasSider, collapse] = useState(!window.innerWidth >= 1200)

    return (
        <Layout className='san-portal-layout'>
            <Layout.Sider
                style={{
                    background: 'rgba(37, 90, 208, 1)'
                }}
                theme='light'
                collapsed={hasSider}
                collapsedWidth={0}
                breakpoint={'xl'}
                onBreakpoint={broken => collapse(broken)}
            />
            <Layout>
                <Layout.Content className='san-portal-layout__content'>
                    {children}
                </Layout.Content>
                <Layout.Footer />
            </Layout>
        </Layout>
    )
}

export default SANPortalLayout
