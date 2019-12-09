import React, { useMemo } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useLayoutContext } from './Context'
import { useLayoutContext as useTrackContext } from 'Pages/Private/Context'

import { SANLayout } from '@sanar/components'

import RMMenuContent from './Menu'
import { defaultFooterProps } from 'Components/Footer'

import logo from 'Assets/images/brand/logo-menu.svg'

const RMLayout: React.FC<RouteComponentProps> = ({ history, children }) => {
    const {
        menuRef,
        currentMenuTitle,
        darkMode,
        menuContext,
        footerProps
    } = useLayoutContext()
    const { handleTrack } = useTrackContext()

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
                onClick: () => {
                    handleTrack('Precisa de Ajuda button clicked')
                    history.push('/inicio/central-ajuda')
                }
            },
            darkMode,
            ...footerProps
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [darkMode, history, footerProps]
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

export default withRouter(RMLayout)
