import React, { memo } from 'react'

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

import { GET_QUIZ } from 'Apollo/Classroom/Queries/quiz'

import { useLayoutContext } from 'Pages/Private/Layout/Context'

import { useClassroomContext } from '../Context'
import { withClassroomProvider, useClassroomQuizContext } from './Context'
import RMClassRoomQuizQuestion from './Question'

const RMClassRoomQuiz = memo<RouteComponentProps>(props => {
    const {
        match: { url }
    } = props
    const { onOpenMenu, params } = useLayoutContext()
    const { setQuestions } = useClassroomQuizContext()
    const { specialty, clickerName } = useClassroomContext()

    const setQuestionContext = ({ quiz }) => {
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
            {() => (
                <SANBox flex='1'>
                    <SANClassroomHeader
                        title={clickerName}
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
                                path={`${url}/:questionIndex`}
                                component={RMClassRoomQuizQuestion}
                            />
                        </Switch>
                    </SANLayoutContainer>
                </SANBox>
            )}
        </SANQuery>
    )
})

const enhance = compose(withClassroomProvider, withRouter)

export default enhance(RMClassRoomQuiz)
