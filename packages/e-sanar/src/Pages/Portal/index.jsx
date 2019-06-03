import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Query } from 'react-apollo'

import SANCoursePage from './Course'
import SANPortalLayout from './Layout'

import { GET_ME } from 'Apollo/Me/query'
import { useAuthContext } from 'Hooks/auth'

import ESSplashLoader from 'sanar-ui/dist/Components/Atoms/SplashLoader'
import ESQuestionDetailsPage from './Questions/Details/QuestionDetails'

const SANPortalRoutes = ({ match: { url } }) => {
    const { setMe } = useAuthContext()

    return (
        <Query query={GET_ME} onCompleted={({ me }) => setMe(me)}>
            {({ loading }) => (
                <>
                    {loading ? (
                        <ESSplashLoader />
                    ) : (
                        <SANPortalLayout>
                            <Switch>
                                <Route
                                    path={`${url}/curso`}
                                    strict
                                    component={SANCoursePage}
                                />
                                <Route
                                    path={`${url}/questoes`}
                                    strict
                                    component={ESQuestionDetailsPage}
                                />
                                <Route
                                    path={[`${url}/*`, `${url}`]}
                                    render={() => (
                                        <Redirect
                                            from='/'
                                            to={`${url}/curso`}
                                        />
                                    )}
                                />
                            </Switch>
                        </SANPortalLayout>
                    )}
                </>
            )}
        </Query>
    )
}

export default SANPortalRoutes
