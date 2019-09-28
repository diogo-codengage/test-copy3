import React, { useEffect } from 'react'

import { compose } from 'ramda'
import {
    withRouter,
    RouteComponentProps,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import {
    SANQuery,
    SANClassroomHeader,
    SANBox,
    SANLayoutContainer
} from '@sanar/components'

import { GET_RESOURCE } from 'Apollo/Classroom/Queries/resource'

import { useLayoutContext } from 'Pages/Layout/Context'

import { withClassroomProvider, useClassroomQuizContext } from './Context'
import FLXClassRoomQuizStart from './Start'
import FLXClassRoomQuizQuestion from './Question'
import FLXClassRoomQuizFinished from './Finished'

interface IParams {
    courseId: string
    resourceId: string
    themeId: string
    type: string
}

const FLXClassRoomQuiz = (props: RouteComponentProps<IParams>) => {
    const {
        match: {
            url,
            params: { themeId, resourceId, courseId }
        }
    } = props
    const { onOpenMenu, navigations, menuRef, menuState } = useLayoutContext()
    const { setQuestions, stopwatchRef } = useClassroomQuizContext()

    const setQuestionContext = ({ resource }) => {
        const questions = resource.quiz.questionItems.data.map(e => e.question)
        setQuestions(questions)
    }

    useEffect(() => {
        if (
            !!menuRef &&
            !!menuRef.current &&
            !!stopwatchRef &&
            !!stopwatchRef.current
        ) {
            menuState
                ? stopwatchRef.current.pause()
                : stopwatchRef.current.start()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuState])

    return (
        <SANQuery
            query={GET_RESOURCE}
            options={{
                variables: { themeId, resourceId, courseId },
                onCompleted: setQuestionContext
            }}
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
                        <Switch>
                            <Route
                                path={`${url}/inicio`}
                                component={FLXClassRoomQuizStart}
                            />
                            <Route
                                path={`${url}/finalizado`}
                                component={FLXClassRoomQuizFinished}
                            />
                            <Route
                                exact
                                path={`${url}/:questionId`}
                                component={FLXClassRoomQuizQuestion}
                            />
                            <Route
                                path={[`${url}`, `${url}/`]}
                                render={() => <Redirect to={`${url}/inicio`} />}
                            />
                        </Switch>
                    </SANLayoutContainer>
                </SANBox>
            )}
        </SANQuery>
    )
}

const enhance = compose(
    withClassroomProvider,
    withRouter
)

export default enhance(FLXClassRoomQuiz)
