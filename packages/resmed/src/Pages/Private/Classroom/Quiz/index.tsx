import React, { memo, useEffect } from 'react'

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
import { IParams } from '../'

const RMClassRoomQuiz = memo<RouteComponentProps<IParams>>(props => {
    const {
        match: { url, params: paramsProp }
    } = props
    const { onOpenMenu, params, setParams } = useLayoutContext()
    const { setQuestions } = useClassroomQuizContext()
    const { specialty, clickerName } = useClassroomContext()

    const setQuestionContext = ({ quiz }) => {
        setQuestions(quiz.questions)
    }

    useEffect(() => {
        if (paramsProp.contentId !== params.contentId) {
            setParams(old => ({ ...old, ...paramsProp }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsProp])

    return (
        <SANQuery
            query={GET_QUIZ}
            options={{
                variables: { id: paramsProp.contentId },
                onCompleted: setQuestionContext,
                skip: !paramsProp.contentId
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
