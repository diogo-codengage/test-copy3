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

import { useClassroomContext } from '../Context'
import { withClassroomProvider, useClassroomQuizContext } from './Context'
import RMClassRoomQuizQuestion from './Question'

const RMClassRoomQuiz = (props: RouteComponentProps) => {
    const {
        match: { url },
        history
    } = props
    const { onOpenMenu, params } = useLayoutContext()
    const { setQuestions } = useClassroomQuizContext()
    const { specialty } = useClassroomContext()

    const setQuestionContext = ({ quiz }) => {
        history.push(`${url}/${quiz.questions[0].id}`)
        setQuestions(quiz.questions)
    }

    return (
        <SANQuery
            query={GET_QUIZ}
            options={{
                variables: { id: params.contentId },
                onCompleted: setQuestionContext,
                skip: !params.contentId || params.type !== 'quiz'
            }}
            loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
            errorProps={{ dark: true }}
        >
            {({ data: { quiz } }: { data: IQuizQuery }) => (
                <SANBox flex='1'>
                    <SANClassroomHeader
                        title={quiz.title}
                        subtitle={specialty.title}
                        onOpenMenu={onOpenMenu}
                        actions={false}
                        plataform='resmed'
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
