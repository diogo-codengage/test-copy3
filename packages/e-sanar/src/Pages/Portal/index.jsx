import React, { useEffect, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import SANSplashLoader from 'Components/SplashLoader'

import { GET_ME } from 'Apollo/Me/query'
import { GET_LAST_ENROLLMENT_ACCESSED } from 'Apollo/Me/last-enrollment-accessed'
import { useAuthContext } from 'Hooks/auth'
import { useApolloContext } from 'Hooks/apollo'

import SANPortalLayout from './Layout'
import { SANPortalProvider } from './Context'
import ESDefaultError from '../Portal/Errors/Default'
import SANBookmarkRouter from './Bookmark'

const SANCoursePage = React.lazy(() => import('./Course'))
const SANQuestionsPage = React.lazy(() => import('./Questions'))
const SANMyAccountChangePassword = React.lazy(() => import('./MyAccount'))
const SANHelpCenter = React.lazy(() => import('./HelpCenter'))
const SANClassroomPage = React.lazy(() => import('./Classrom'))

const SANPortalRoutes = ({ match: { url } }) => {
    const client = useApolloContext()
    const { setMe, setEnrollment } = useAuthContext()

    const handleCompletedMe = ({ me }) => setMe(me)

    const handleCompletedEnrollment = ({ lastEnrollmentAccessed }) =>
        setEnrollment(lastEnrollmentAccessed)

    useEffect(() => {
        return () => client.cache.reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Query query={GET_ME} onCompleted={handleCompletedMe}>
            {({ loading: loadingMe, error: errorMe }) => (
                <Query
                    query={GET_LAST_ENROLLMENT_ACCESSED}
                    onCompleted={handleCompletedEnrollment}
                >
                    {({
                        loading: loadingEnrollment,
                        error: errorEnrollment
                    }) => {
                        if (loadingMe || loadingEnrollment) {
                            return <SANSplashLoader />
                        }
                        if (errorMe || errorEnrollment) {
                            return <ESDefaultError />
                        }

                        return (
                            <SANPortalProvider>
                                <SANPortalLayout>
                                    <Suspense
                                        fallback={
                                            <SANSplashLoader size='flexible' />
                                        }
                                    >
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
                                                component={SANBookmarkRouter}
                                            />
                                            <Route
                                                path={`${url}/minha-conta`}
                                                component={
                                                    SANMyAccountChangePassword
                                                }
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
                                                    <Redirect
                                                        to={`${url}/curso`}
                                                    />
                                                )}
                                            />
                                        </Switch>
                                    </Suspense>
                                </SANPortalLayout>
                            </SANPortalProvider>
                        )
                    }}
                </Query>
            )}
        </Query>
    )
}

export default SANPortalRoutes
