import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import ESQuestionList from './List/QuestionList'
import { ESQuestionHeader } from './Header'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import SANQuestionsFilter from './Filter'
import SANQuestionDetailsPage from './Details/QuestionDetails'

const SANQuestions = ({ match: { url } }) => {
    return (
        <div className='questions'>
            <Switch>
                <Route path={`${url}/filtro`} component={SANQuestionsFilter} />
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
