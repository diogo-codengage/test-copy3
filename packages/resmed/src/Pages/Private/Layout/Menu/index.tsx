import React, { memo } from 'react'

import { useLayoutContext } from '../Context'

import RMMenuInitial from './Initial'
import RMAccountMenu from './Account'
import RMClassroomMenu from './Classroom'
import RMChangeCourse from './ChangeCourse'

const RMMenuContent = memo(() => {
    const { currentMenuIndex } = useLayoutContext()

    switch (currentMenuIndex) {
        case 0:
            return <RMMenuInitial />
        case 1:
            return <RMAccountMenu />
        case 2:
            return <RMClassroomMenu />
        case 3:
            return <RMChangeCourse />
        default:
            return <RMMenuInitial />
    }
})

export default RMMenuContent
