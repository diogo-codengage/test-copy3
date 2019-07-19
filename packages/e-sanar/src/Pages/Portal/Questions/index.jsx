import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import { SANQuestionsProvider } from './Context'

import SANQuestionsFilter from './Filter'
import SANQuestionsHistoric from './Historic'
import SANQuestionPage from './Question'
import SANPracticeCompletedPage from './PracticeCompleted'
import SANBookmarkedQuestion from './Bookmarked'

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
                        path={`${url}/perguntas/:id?`}
                        component={SANBookmarkedQuestion}
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
