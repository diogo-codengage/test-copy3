import React from 'react'

import { useLayoutContext } from '../Context'

import RMMenuInitial from './Initial'
import RMAccountMenu from './Account'
import RMClassroomMenu from './Classroom'

const RMMenuContent: React.FC = () => {
    const { currentMenuIndex } = useLayoutContext()

    switch (currentMenuIndex) {
        case 0:
            return <RMMenuInitial />
        case 1:
            return <RMAccountMenu />
        case 2:
            return <RMClassroomMenu />
        default:
            return <RMMenuInitial />
    }
}

export default RMMenuContent
