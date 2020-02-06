import React from 'react'
import SANCourseContinue from './Continue'
import SANCourseModules from './Modules'
import SANLives from './Lives'
import SANNextLives from './NextLives'
import SANProfessors from './Professors'

const SANCourseTabContent = () => (
    <div className='san-tab-course-content'>
        <SANCourseContinue />
        <SANCourseModules />
        <SANLives />
        <SANNextLives />
        <SANProfessors />
    </div>
)

export default SANCourseTabContent
