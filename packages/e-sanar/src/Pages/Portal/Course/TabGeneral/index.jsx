import React from 'react'

import SANPerformance from './Performance'
import SANProfessors from './Professors'
import SANInteractions from './Interactions'

const SANCourseTabGeneral = () => (
    <div className='san-tab-course-general'>
        <SANPerformance />
        <SANInteractions />
        <SANProfessors />
    </div>
)

export default SANCourseTabGeneral
