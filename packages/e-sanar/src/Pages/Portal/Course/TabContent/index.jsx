import React from 'react'
import SANCourseContinue from './Continue'
import SANCourseModules from './Modules'
import SANLives from './Lives'
import SANNextLives from './NextLives'

const SANCourseTabContent = () => (
    <div className='san-tab-course-content'>
        <SANCourseContinue />
        <SANCourseModules />
        <SANLives />
        <SANNextLives />
    </div>
)

export default SANCourseTabContent
