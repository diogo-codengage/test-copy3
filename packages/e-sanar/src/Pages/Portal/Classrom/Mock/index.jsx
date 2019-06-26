import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import ESLessonHeader, {
    ESLessonHeaderExtra,
    ESLessonHeaderLeft
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'

import { usePortalContext } from 'Pages/Portal/Context'
import SANQuiz from 'Components/Quiz'
import { useClassroomContext } from '../Context'
import { useLayoutContext } from '../../Layout/Context'

const SANClassroomMock = () => {
    const { t } = useTranslation('esanar')
    const {
        currentResource,
        nextResource,
        prevResource,
        onNavigation,
        currentModule
    } = usePortalContext()
    const { handleBookmark, bookmarked, handleProgress } = useClassroomContext()
    const { setOpenMenu } = useLayoutContext()

    useEffect(() => {
        if (currentResource) {
            handleProgress({
                percentage: 100,
                resourceId: currentResource.quiz.id
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentResource.video])

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
                        onClick={() => setOpenMenu(oldOpenMenu => !oldOpenMenu)}
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
                mock
            />
        </div>
    )
}

export default SANClassroomMock
