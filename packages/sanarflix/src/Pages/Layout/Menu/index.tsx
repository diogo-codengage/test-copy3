import React from 'react'
import FLXMenuInitial from './Initial'
import { useLayoutContext } from '../Context'

import FLXClassroomMenu from './Classroom'

const FLXMenuContent: React.FC = () => {
    const { currentMenuIndex } = useLayoutContext()

    switch (currentMenuIndex) {
        case 0:
            return <FLXMenuInitial />
        case 1:
            return <FLXClassroomMenu />
        default:
            return <FLXMenuInitial />
    }
}

export default FLXMenuContent
