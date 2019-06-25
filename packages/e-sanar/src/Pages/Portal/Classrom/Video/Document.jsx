import React, { useState, useEffect } from 'react'
import ESLessonHeader, {
    ESLessonHeaderExtra
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESPdfReader from 'sanar-ui/dist/Components/Atoms/PdfReader'
import { useClassroomContext } from '../Context'
import { useAuthContext } from 'Hooks/auth'
import { CREATE_BOOKMARK } from 'Apollo/Classroom/mutations/bookmark'
import { useApolloContext } from 'Hooks/apollo'
import { useTranslation } from 'react-i18next'

const SANClassRoomDocument = () => {
    const { me } = useAuthContext()
    const { t } = useTranslation('esanar')
    const { current } = useClassroomContext()
    const [bookmarked, setBookmarked] = useState(
        current && current.document && current.document.bookmarked
    )
    const client = useApolloContext()

    // const handleNext = () => {}

    const handleBookmarking = async () => {
        
        await client.mutate({
            mutation: CREATE_BOOKMARK,
            variables: {
                resourceId: current.document.id,
                resourceType: current.resource_type,
                userId: me.id
            }
        })

        setBookmarked(!bookmarked)
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <ESLessonHeader
                leftChildren={
                    <>
                        <ESTypography ellipsis level={5}>
                            {current &&
                                current.document &&
                                current.document.title}
                        </ESTypography>
                        <div className='subtitle'>
                            <ESTypography
                                variant='subtitle2'
                                className='subtitle__path'
                                ellipsis
                            />
                        </div>
                    </>
                }
                rightChildren={
                    <ESLessonHeaderExtra
                        previousLesson={t('classroom.previous')}
                        nextLesson={t('classroom.next')}
                        bookmarkLabel={t('classroom.bookmarkDocument')}
                        bookmarked={bookmarked}
                        onBookmarked={handleBookmarking}
                    />
                }
            />
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ESPdfReader
                    url={
                        current &&
                        current.document &&
                        current.document.file &&
                        current.document.file.url
                    }
                />
            </div>
        </div>
    )
}

export default SANClassRoomDocument
