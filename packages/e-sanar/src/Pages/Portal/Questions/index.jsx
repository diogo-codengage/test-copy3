import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import SANQuestionsFilter from './Filter'
import SANQuestionsHistoric from './Historic'
import SANQuestionDetailsPage from './Details/QuestionDetails'

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
                    path={`${url}/perguntas`}
                    component={SANQuestionDetailsPage}
                />
                <Route
                    path={[`${url}/`, `${url}`]}
                    render={() => <Redirect to={`${url}/filtro`} />}
                />
            </Switch>
        </div>
    )
}

export default SANQuestions
