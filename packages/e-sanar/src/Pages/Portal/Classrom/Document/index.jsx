import React from 'react'

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
        currentModule
    } = usePortalContext()
    const { handleBookmark, bookmarked } = useClassroomContext()

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
                        onClick={() => alert('open menu')}
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
