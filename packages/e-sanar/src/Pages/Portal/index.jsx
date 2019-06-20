import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'

import ESSplashLoader from 'sanar-ui/dist/Components/Atoms/SplashLoader'

import { GET_ME } from 'Apollo/Me/query'
import { useAuthContext } from 'Hooks/auth'

import SANPortalLayout from './Layout'
import SANCoursePage from './Course'
import SANQuestionsPage from './Questions'
import SANClassroomPage from './Classrom'

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
                                    path={`${url}/banco-questoes`}
                                    component={SANQuestionsPage}
                                />
                                <Route
                                    path={`${url}/sala-aula/:id`}
                                    component={SANClassroomPage}
                                />
                                <Route
                                    path={[`${url}/`, `${url}`]}
                                    render={() => (
                                        <Redirect to={`${url}/curso`} />
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
