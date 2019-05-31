import React from 'react'
import SANCourseContinue from './Continue'
import SANCourseModules from './Modules'
import SANCourseProfessors from './Professors'

const SANCourseTabContent = () => (
    <div className='san-tab-course-content'>
        <SANCourseContinue />
        <SANCourseModules />
        <SANCourseProfessors />
    </div>
)

export default SANCourseTabContent
