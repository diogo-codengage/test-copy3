import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANPdfReader, SANQuery, SANClassroomHeader } from '@sanar/components'

import { GET_RESOURCE } from 'Apollo/Classroom/Queries/resource'
import { useClassroomContext } from './Context'

interface IParams {
    resourceId: string
    themeId: string
    type: string
}

const FLXClassRoomDocument = (props: RouteComponentProps<IParams>) => {
    const {
        match: {
            params: { themeId, resourceId }
        }
    } = props
    const { t } = useTranslation('sanarflix')
    const { handleBookmark } = useClassroomContext()

    return (
        <SANQuery
            query={GET_RESOURCE}
            options={{ variables: { themeId, resourceId } }}
            loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
        >
            {({ data: { resource } }) => (
                <>
                    <SANClassroomHeader
                        title={resource.document.title}
                        subtitle={resource.course.name}
                        ButtonPreviousProps={{
                            children: 'Anterior'
                        }}
                        ButtonNextProps={{
                            children: 'Próximo'
                        }}
                        ButtonBookmarkProps={{
                            children: t('classroom.document.bookmark'),
                            bookmarked: resource.document.bookmarked,
                            onClick: () =>
                                handleBookmark({
                                    resourceId,
                                    resourceType: 'Document',
                                    bookmark: resource.document.bookmarked
                                })
                        }}
                    />
                    <SANPdfReader
                        url={resource.document.file.url}
                        hasDownload={false}
                    />
                </>
            )}
        </SANQuery>
    )
}

export default withRouter(FLXClassRoomDocument)
