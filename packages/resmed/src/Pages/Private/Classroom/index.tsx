import React, { useEffect, memo } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import {
    withRouter,
    RouteComponentProps,
    Switch,
    Route
} from 'react-router-dom'

import { useLayoutContext } from 'Pages/Private/Layout/Context'
import RMClassroomProvider from './Context'

import RMClassroomVideo from './Video'
import RMClassroomQuiz from './Quiz'
import RMClassroomRating from './Rating'
import RMClassroomFeedback from './Feedback'

export interface IParams {
    specialtyId: string
    subspecialtyId: string
    lessonId: string
    collectionId: string
    type: 'video' | 'quiz'
    status: 'avaliacao' | 'feedback'
    contentId: string
}

const Wrapper = styled.div`
    background-color: ${theme('colors.grey-solid.8')};
    flex: 1;
    display: flex;
    flex-direction: column;
`

const RMClassroom = memo<RouteComponentProps<IParams>>(
    ({ match: { params, url } }) => {
        const { setParams } = useLayoutContext()

        useEffect(() => {
            setParams(old => ({ ...old, ...params }))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return (
            <RMClassroomProvider>
                <Wrapper>
                    <Switch>
                        <Route
                            path={[
                                `${url}/:subspecialtyId/:lessonId/:collectionId/quiz/:contentId`,
                                `${url}/:lessonId/:collectionId/quiz/:contentId`
                            ]}
                            component={RMClassroomQuiz}
                        />
                        <Route
                            path={[
                                `${url}/:subspecialtyId/:lessonId/:collectionId/video/:contentId`,
                                `${url}/:lessonId/:collectionId/video/:contentId`
                            ]}
                            component={RMClassroomVideo}
                        />
                        <Route
                            exact
                            path={[
                                `${url}/:subspecialtyId/:lessonId/avaliacao`,
                                `${url}/:lessonId/avaliacao`
                            ]}
                            component={RMClassroomRating}
                        />
                        <Route
                            exact
                            path={[
                                `${url}/:subspecialtyId/:lessonId/feedback`,
                                `${url}/:lessonId/feedback`
                            ]}
                            component={RMClassroomFeedback}
                        />
                    </Switch>
                </Wrapper>
            </RMClassroomProvider>
        )
    }
)

export default withRouter(RMClassroom)
