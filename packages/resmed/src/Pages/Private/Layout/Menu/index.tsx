import React from 'react'

import { useLayoutContext } from '../Context'

import RMMenuInitial from './Initial'
import RMAccountMenu from './Account'

const RMMenuContent: React.FC = () => {
    const { currentMenuIndex } = useLayoutContext()

    switch (currentMenuIndex) {
        case 0:
            return <RMMenuInitial />
        case 1:
            return <RMAccountMenu />
        default:
            return <RMMenuInitial />
    }
}

export default RMMenuContent
