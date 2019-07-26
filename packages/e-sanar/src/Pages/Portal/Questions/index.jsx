import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import { SANQuestionsProvider } from './Context'

const SANQuestionsFilter = React.lazy(() => import('./Filter'))
const SANQuestionsHistoric = React.lazy(() => import('./Historic'))
const SANQuestionPage = React.lazy(() => import('./Question'))
const SANPracticeCompletedPage = React.lazy(() => import('./PracticeCompleted'))

const SANQuestions = ({ match: { url } }) => {
    return (
        <SANQuestionsProvider>
            <div className='questions'>
                <Switch>
                    <Route
                        path={`${url}/filtro`}
                        component={SANQuestionsFilter}
                    />
                    <Route
                        path={`${url}/historico`}
                        component={SANQuestionsHistoric}
                    />
                    <Route
                        path={`${url}/finalizado`}
                        component={SANPracticeCompletedPage}
                    />
                    <Route
                        path={`${url}/perguntas`}
                        exact={true}
                        component={SANQuestionPage}
                    />
                    <Route
                        path={[`${url}/`, `${url}`]}
                        render={() => <Redirect to={`${url}/filtro`} />}
                    />
                </Switch>
            </div>
        </SANQuestionsProvider>
    )
}

export default SANQuestions
