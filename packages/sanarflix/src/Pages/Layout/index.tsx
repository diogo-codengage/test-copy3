import React from 'react'

import { SANLayout } from '@sanar/components'
import FLXMenuContent from './Menu'

import { useLayoutContext } from './Context'

import logo from 'Assets/images/brand/logo-menu.svg'
import logoFooter from 'Assets/images/brand/logo-grey.svg'

const FLXLayout: React.FC = ({ children }) => {
    const { menuRef, currentMenuTitle } = useLayoutContext()
    const MenuProps = {
        children: <FLXMenuContent />,
        logo,
        ref: menuRef,
        title: currentMenuTitle
    }

    const FooterProps = {
        logo: logoFooter
    }

    return (
        <SANLayout
            showContinueBar={true}
            FooterProps={FooterProps}
            MenuProps={MenuProps}
        >
            {children}
        </SANLayout>
    )
}

export default FLXLayout
