import React from 'react'
import SANPracticeCompletedHeader from './Header'
import ESPracticeCompleted from 'sanar-ui/dist/Components/Organisms/PracticeCompleted'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const SANPracticeCompletedPage = () => (
    <div className='san-practice-completed'>
        <SANPracticeCompletedHeader />

        <div className='san-practice-completed__content'>
            <SANPortalPagesContainer>
                <ESPracticeCompleted />
            </SANPortalPagesContainer>
        </div>
    </div>
)

export default SANPracticeCompletedPage
