import React from 'react'

import { SANLayout } from '@sanar/components/dist/Components/Organisms/Layout'
import FLXMenuContent from './Menu'

import logo from 'Assets/images/brand/logo-menu.svg'
import { useLayoutContext } from './Context'

const FLXLayout: React.FC = ({ children }) => {
    const { menuRef, currentMenuTitle } = useLayoutContext()
    const MenuProps = {
        children: <FLXMenuContent />,
        logo,
        ref: menuRef,
        title: currentMenuTitle
    }

    return (
        <SANLayout showContinueBar={false} MenuProps={MenuProps}>
            {children}
        </SANLayout>
    )
}

export default FLXLayout
