import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import ESLessonHeader, {
    ESLessonHeaderExtra,
    ESLessonHeaderLeft
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'
import ESPdfReader from 'sanar-ui/dist/Components/Atoms/PdfReader'

import { usePortalContext } from 'Pages/Portal/Context'
import { useClassroomContext } from '../Context'

const SANClassRoomDocument = () => {
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
        handleProgress,
        openMenu
    } = useClassroomContext()

    useEffect(() => {
        if (currentResource) {
            handleProgress({
                percentage: 100,
                resourceId: currentResource.document.id
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentResource.document])

    return (
        <div className='classroom__document'>
            <ESLessonHeader
                bookmarked={bookmarked}
                onBookmarked={handleBookmark}
                leftChildren={
                    <ESLessonHeaderLeft
                        title={currentResource.document.title}
                        subtitle={`${t(
                            'global.subject'
                        )} ${currentModule.index + 1}, ${t(
                            'global.activity'
                        )} ${currentResource.index + 1}`}
                        onClick={() => openMenu()}
                    />
                }
                rightChildren={
                    <ESLessonHeaderExtra
                        previousLesson={prevResource && prevResource.title}
                        nextLesson={nextResource && nextResource.title}
                        onPrev={onNavigation('prev')}
                        onNext={onNavigation('next')}
                        bookmarkLabel={t('classroom.bookmarkDocument')}
                        bookmarked={bookmarked}
                        onBookmarked={handleBookmark}
                    />
                }
            />
            <ESPdfReader
                url={
                    currentResource &&
                    currentResource.document &&
                    currentResource.document.file &&
                    currentResource.document.file.url
                }
            />
        </div>
    )
}

export default SANClassRoomDocument