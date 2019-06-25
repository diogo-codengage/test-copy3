import React from 'react'

import { useTranslation } from 'react-i18next'

import ESLessonHeader, {
    ESLessonHeaderExtra,
    ESLessonHeaderLeft
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'

import { usePortalContext } from 'Pages/Portal/Context'
import SANQuiz from 'Components/Quiz'

const SANClassroomMock = () => {
    const { t } = useTranslation('esanar')
    const {
        currentResource,
        nextResource,
        prevResource,
        onNavigation,
        currentModule
    } = usePortalContext()

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
                        onClick={() => alert('open menu')}
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
            <SANQuiz quiz={currentResource.quiz} mock />
        </div>
    )
}

export default SANClassroomMock
