import React from 'react'
import FLXMenuInitial from './Initial'
import { useLayoutContext } from '../Context'

import FLXClassroomMenu from './Classroom'
import FLXAccountMenu from './Account'

const FLXMenuContent: React.FC = () => {
    const { currentMenuIndex } = useLayoutContext()

    switch (currentMenuIndex) {
        case 0:
            return <FLXMenuInitial />
        case 1:
            return <FLXClassroomMenu />
        case 2:
            return <FLXAccountMenu />
        default:
            return <FLXMenuInitial />
    }
}

export default FLXMenuContent
