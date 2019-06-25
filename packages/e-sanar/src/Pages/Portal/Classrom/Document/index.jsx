import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import ESLessonHeader, {
    ESLessonHeaderExtra,
    ESLessonHeaderLeft
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'
import ESPdfReader from 'sanar-ui/dist/Components/Atoms/PdfReader'

import { useAuthContext } from 'Hooks/auth'
import { CREATE_BOOKMARK } from 'Apollo/Classroom/mutations/bookmark'
import { useApolloContext } from 'Hooks/apollo'

import { usePortalContext } from 'Pages/Portal/Context'

const SANClassRoomDocument = () => {
    const { me } = useAuthContext()
    const { t } = useTranslation('esanar')
    const {
        currentResource,
        nextResource,
        prevResource,
        onNavigation,
        currentModule
    } = usePortalContext()
    const [bookmarked, setBookmarked] = useState(
        currentResource &&
            currentResource.document &&
            currentResource.document.bookmarked
    )
    const client = useApolloContext()

    // const handleNext = () => {}

    const handleBookmarking = async () => {
        await client.mutate({
            mutation: CREATE_BOOKMARK,
            variables: {
                resourceId: currentResource.document.id,
                resourceType: currentResource.resource_type,
                userId: me.id
            }
        })

        setBookmarked(!bookmarked)
    }

    return (
        <div className='classroom__document'>
            <ESLessonHeader
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
                        onBookmarked={handleBookmarking}
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
