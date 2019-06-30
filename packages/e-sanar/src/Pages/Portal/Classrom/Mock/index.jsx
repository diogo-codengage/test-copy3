import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import ESLessonHeader, {
    ESLessonHeaderExtra,
    ESLessonHeaderLeft
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'

import { usePortalContext } from 'Pages/Portal/Context'
import SANQuiz from 'Components/Quiz'
import { useClassroomContext } from '../Context'

const SANClassroomMock = () => {
    const { t } = useTranslation('esanar')
    const {
        currentResource,
        nextResource,
        prevResource,
        onNavigation,
        state: { currentModule }
    } = usePortalContext()
    const {
        handleBookmark,
        bookmarked,
        openMenu,
        stopwatchRef
    } = useClassroomContext()

    return (
        <div className='classroom__mock'>
            <ESLessonHeader
                leftChildren={
                    <ESLessonHeaderLeft
                        title={currentResource.quiz.title}
                        subtitle={`${t(
                            'global.subject'
                        )} ${currentModule.index + 1}, ${t(
                            'global.activity'
                        )} ${currentResource.index + 1}`}
                        onClick={openMenu}
                    />
                }
                rightChildren={
                    <ESLessonHeaderExtra
                        previousLesson={prevResource && prevResource.title}
                        nextLesson={nextResource && nextResource.title}
                        onPrev={onNavigation('prev')}
                        onNext={onNavigation('next')}
                    />
                }
            />
            <SANQuiz
                quiz={currentResource.quiz}
                bookmarked={bookmarked}
                handleBookmark={handleBookmark}
                stopwatchRef={stopwatchRef}
                mock
            />
        </div>
    )
}

export default SANClassroomMock
