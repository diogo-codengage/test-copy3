import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'

import ESSplashLoader from 'sanar-ui/dist/Components/Atoms/SplashLoader'

import { GET_ME } from 'Apollo/Me/query'
import { useAuthContext } from 'Hooks/auth'
import { useApolloContext } from 'Hooks/apollo'

import SANPortalLayout from './Layout'
import SANCoursePage from './Course'
import SANQuestionsPage from './Questions'
import SANClassroomPage from './Classrom'
import SANMyAccountChangePassword from './MyAccount'
import SANHelpCenter from './HelpCenter'
import { SANPortalProvider } from './Context'
import ESDefaultError from '../Portal/Errors/Default'
import SANBookmarkPage from './Bookmark'

const SANPortalRoutes = ({ match: { url } }) => {
    const client = useApolloContext()
    const { setMe } = useAuthContext()

    const handleCompleted = ({ me }) => setMe(me)

    useEffect(() => {
        return () => client.cache.reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Query query={GET_ME} onCompleted={handleCompleted}>
            {({ loading, error }) => (
                <>
                    {loading && !error ? (
                        <ESSplashLoader />
                    ) : !loading && error ? (
                        <ESDefaultError />
                    ) : (
                        <SANPortalProvider>
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
                                        path={`${url}/favoritos`}
                                        component={SANBookmarkPage}
                                    />
                                    <Route
                                        path={`${url}/minha-conta`}
                                        component={SANMyAccountChangePassword}
                                    />
                                    <Route
                                        path={`${url}/central-ajuda`}
                                        component={SANHelpCenter}
                                    />
                                    <Route
                                        path={`${url}/sala-aula/:moduleId/:type?/:resourceId?`}
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
                        </SANPortalProvider>
                    )}
                </>
            )}
        </Query>
    )
}

export default SANPortalRoutes
