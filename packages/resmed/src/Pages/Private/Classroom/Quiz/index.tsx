import React from 'react'

import { compose } from 'ramda'
import {
    withRouter,
    RouteComponentProps,
    Route,
    Switch
} from 'react-router-dom'

import {
    SANQuery,
    SANClassroomHeader,
    SANBox,
    SANLayoutContainer
} from '@sanar/components'

import { GET_QUIZ, IQuizQuery } from 'Apollo/Classroom/Queries/quiz'

import { useLayoutContext } from 'Pages/Private/Layout/Context'

import { withClassroomProvider, useClassroomQuizContext } from './Context'
import RMClassRoomQuizQuestion from './Question'

const RMClassRoomQuiz = (props: RouteComponentProps) => {
    const {
        match: { url },
        history
    } = props
    const { onOpenMenu, params } = useLayoutContext()
    const { setQuestions } = useClassroomQuizContext()

    const setQuestionContext = ({ quiz }) => {
        history.push(`${url}/${quiz.questions[0].id}`)
        setQuestions(quiz.questions)
    }

    return (
        <SANQuery
            query={GET_QUIZ}
            options={{
                variables: { id: params.contentId },
                onCompleted: setQuestionContext
            }}
            loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
            errorProps={{ dark: true }}
        >
            {({ data: { quiz } }: { data: IQuizQuery }) => (
                <SANBox flex='1'>
                    <SANClassroomHeader
                        title={quiz.title}
                        subtitle={quiz.specialty.name}
                        onOpenMenu={onOpenMenu}
                        actions={false}
                    />
                    <SANLayoutContainer
                        pb='8'
                        pt={{ xs: '8', _: 'xl' }}
                        px={{ lg: 'md', _: '0' }}
                    >
                        <Switch>
                            <Route
                                exact
                                path={`${url}/:questionId`}
                                component={RMClassRoomQuizQuestion}
                            />
                        </Switch>
                    </SANLayoutContainer>
                </SANBox>
            )}
        </SANQuery>
    )
}

const enhance = compose(withClassroomProvider, withRouter)

export default enhance(RMClassRoomQuiz)
