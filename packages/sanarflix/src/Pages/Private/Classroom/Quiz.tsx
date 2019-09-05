import React from 'react'

import { theme } from 'styled-tools'
import styled from 'styled-components'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANPdfReader,
    SANQuery,
    SANClassroomHeader,
    SANBox,
    SANLayoutContainer,
    SANStartQuiz
} from '@sanar/components'

import { GET_RESOURCE } from 'Apollo/Classroom/Queries/resource'
import { useClassroomContext } from './Context'
import { useLayoutContext } from 'Pages/Layout/Context'

interface IParams {
    resourceId: string
    themeId: string
    type: string
}

const PdfReader = styled(SANPdfReader)`
    && {
        ${theme('mediaQueries.down.xs')} {
            min-height: calc(100vh - 174px);
        }
    }
`

const FLXClassRoomQuiz = (props: RouteComponentProps<IParams>) => {
    const {
        match: {
            params: { themeId, resourceId }
        }
    } = props
    const { t } = useTranslation('sanarflix')
    const { handleBookmark } = useClassroomContext()
    const { onOpenMenu, navigations } = useLayoutContext()

    return (
        <SANQuery
            query={GET_RESOURCE}
            options={{ variables: { themeId, resourceId } }}
            loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
        >
            {({ data: { resource } }) => (
                <SANBox flex='1'>
                    <SANClassroomHeader
                        title={resource.quiz.title}
                        subtitle={resource.course.name}
                        onOpenMenu={onOpenMenu}
                        ButtonPreviousProps={navigations.previous}
                        ButtonNextProps={navigations.next}
                    />
                    <SANLayoutContainer py='8'>
                        <SANStartQuiz
                            name='Diogo Biz'
                            ButtonProps={{
                                onClick: () => console.log('222')
                            }}
                        />
                    </SANLayoutContainer>
                </SANBox>
            )}
        </SANQuery>
    )
}

export default withRouter(FLXClassRoomQuiz)
