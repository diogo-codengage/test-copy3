import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import SANQuestionsFilter from './Filter'
import SANQuestionsHistoric from './Historic'
import SANQuestionPage from './Question'
import SANPracticeCompletedPage from './PracticeCompleted'

const SANQuestions = ({ match: { url } }) => {
    return (
        <div className='questions'>
            <Switch>
                <Route path={`${url}/filtro`} component={SANQuestionsFilter} />
                <Route
                    path={`${url}/historico`}
                    component={SANQuestionsHistoric}
                />
                <Route
                    path={`${url}/finalizado`}
                    component={SANPracticeCompletedPage}
                />
                <Route path={`${url}/perguntas`} component={SANQuestionPage} />
                <Route
                    path={[`${url}/`, `${url}`]}
                    render={() => <Redirect to={`${url}/filtro`} />}
                />
            </Switch>
        </div>
    )
}

export default SANQuestions
