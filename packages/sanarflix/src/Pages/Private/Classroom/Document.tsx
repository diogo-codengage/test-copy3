import React, { useEffect } from 'react'

import { theme } from 'styled-tools'
import styled from 'styled-components'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANPdfReader,
    SANQuery,
    SANClassroomHeader,
    SANBox
} from '@sanar/components'

import { GET_RESOURCE } from 'Apollo/Classroom/Queries/resource'

import { events } from 'Config/Segment'

import { useClassroomContext } from './Context'
import { useLayoutContext } from 'Pages/Layout/Context'

interface IParams {
    courseId: string
    resourceId: string
    themeId: string
    type: string
}

const PdfReader = styled(SANPdfReader)`
    && {
        ${theme('mediaQueries.up.md')} {
            min-height: calc(100vh - 99px);
        }
        ${theme('mediaQueries.down.md')} {
            min-height: calc(100vh - 204px);
        }
        ${theme('mediaQueries.down.sm')} {
            min-height: calc(100vh - 180px);
        }
        ${theme('mediaQueries.down.xs')} {
            min-height: calc(100vh - 174px);
        }
    }
`

const FLXClassRoomDocument = (props: RouteComponentProps<IParams>) => {
    const {
        match: {
            params: { themeId, resourceId, courseId }
        }
    } = props
    const { t } = useTranslation('sanarflix')
    const { handleBookmark, handleProgress } = useClassroomContext()
    const { onOpenMenu, navigations } = useLayoutContext()

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
        window.analytics.track(
            events['E-Learning']['Content Viewed'].event,
            events['E-Learning']['Content Viewed'].data
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        handleProgress({
            percentage: 100,
            courseId,
            resource: { id: resourceId, type: 'Document' }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resourceId])

    return (
        <SANQuery
            query={GET_RESOURCE}
            options={{ variables: { themeId, resourceId, courseId } }}
            loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
            errorProps={{ dark: true }}
        >
            {({ data: { resource } }) => (
                <SANBox>
                    <SANClassroomHeader
                        title={resource.document.title}
                        subtitle={resource.course.name}
                        onOpenMenu={onOpenMenu}
                        ButtonPreviousProps={navigations.previous}
                        ButtonNextProps={navigations.next}
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
                    <PdfReader
                        url={resource.document.file.url}
                        hasDownload={false}
                    />
                </SANBox>
            )}
        </SANQuery>
    )
}

export default withRouter(FLXClassRoomDocument)
