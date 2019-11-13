import React, { useMemo } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useLayoutContext } from './Context'

import { SANLayout } from '@sanar/components'

import RMMenuContent from './Menu'
import { defaultFooterProps } from 'Components/Footer'

import logo from 'Assets/images/brand/logo-menu.svg'

const FLXLayout: React.FC<RouteComponentProps> = ({ history, children }) => {
    const {
        menuRef,
        currentMenuTitle,
        darkMode,
        menuContext
    } = useLayoutContext()

    const MenuProps = useMemo(
        () => ({
            children: <RMMenuContent />,
            logo,
            ref: menuRef,
            title: currentMenuTitle,
            onHome: () => history.push('/inicio'),
            context: menuContext,
            theme: darkMode ? 'dark' : 'primary',
            showContinueBar: false
        }),
        [darkMode, menuContext, currentMenuTitle, menuRef, history]
    )

    const FooterProps = useMemo(
        () => ({
            ...defaultFooterProps(darkMode),
            HelpButton: {
                onClick: () => history.push('/inicio/central-ajuda')
            },
            darkMode
        }),
        [darkMode, history]
    )

    return (
        <SANLayout
            showContinueBar={false}
            FooterProps={FooterProps}
            MenuProps={MenuProps}
            darkMode={darkMode}
        >
            {children}
        </SANLayout>
    )
}

export default withRouter(FLXLayout)
