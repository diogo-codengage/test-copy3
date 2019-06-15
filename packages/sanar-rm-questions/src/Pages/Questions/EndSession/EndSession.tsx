import React from 'react'
import { SessionStatusDashboard } from '../Question/SessionStatusDashboard'

import ESCard from 'sanar-ui/dist/Components/Molecules/Card'

export const EndSession = () => {

    return (
        <div style={
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }>
            <ESCard>
                <SessionStatusDashboard/>
            </ESCard>
        </div>
    )

}
