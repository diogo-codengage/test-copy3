import React from 'react'

import SANLeftOffContainer from './Container'
import { SANSkeleton } from 'Components/Atoms/Skeleton'

const SANLeftOffError = () => {
    return (
        <SANLeftOffContainer>
            <SANSkeleton paragraph={{ rows: 3 }} dark active />
        </SANLeftOffContainer>
    )
}

export default SANLeftOffError
