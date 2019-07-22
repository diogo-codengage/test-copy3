import React from 'react'

import SANPerformance from './Performance'
// import SANInteractions from './Interactions'
import SANProfessors from './Professors'

const SANCourseTabGeneral = () => (
    <div className='san-tab-course-general'>
        <SANPerformance />
        {/* <SANInteractions /> */}
        <SANProfessors />
    </div>
)

export default SANCourseTabGeneral
