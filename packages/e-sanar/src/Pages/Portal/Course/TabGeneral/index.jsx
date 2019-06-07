import React from 'react'

import SANPerformance from './Performance'
import SANLives from './Lives'
import SANNextLives from './NextLives'

const SANCourseTabGeneral = () => (
    <div className='san-tab-course-general'>
        <SANPerformance />
        {/*FIXME: <SANInteractions /> */}
        <SANLives />
        <SANNextLives />
    </div>
)

export default SANCourseTabGeneral
