import React from 'react'
import PropTypes from 'prop-types'

import { Switch, Route, Redirect } from 'react-router-dom'

import SANQuestionsFilter from './Filter'
import SANQuestionPage from './Question'
import SANQuestionHeader from './Header'

const SANQuestionDetailsPage = ({ match: { url } }) => {
    return (
        <>
            <SANQuestionHeader />
            <div className='questions-question'>
                <Switch>
                    <Route
                        path={`${url}/pratica`}
                        component={SANQuestionPage}
                    />
                    <Route
                        path={`${url}/filtro`}
                        component={SANQuestionsFilter}
                    />
                    <Route
                        path={[`${url}/`, `${url}`]}
                        render={() => <Redirect to={`${url}/pratica`} />}
                    />
                </Switch>
            </div>
        </>
    )
}

SANQuestionDetailsPage.propTypes = {
    question: PropTypes.any
}

export default SANQuestionDetailsPage
