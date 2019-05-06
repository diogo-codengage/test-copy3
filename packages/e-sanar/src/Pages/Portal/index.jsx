import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Query } from 'react-apollo'

import SANCoursePage from './Course'
import SANPortalLayout from './Layout'

import { GET_ME } from 'Apollo/Me/query'
import { useAuthContext } from 'Hooks/auth'

const SANPortalRoutes = () => {
    const { setMe } = useAuthContext()

    return (
        <Query query={GET_ME} onCompleted={({ me }) => setMe(me)}>
            {({ loading }) => (
                <>
                    {loading ? (
                        'loading'
                    ) : (
                        <SANPortalLayout>
                            <Switch>
                                <Route
                                    path='/course'
                                    component={SANCoursePage}
                                />
                                <Redirect
                                    to={{
                                        pathname: '/course'
                                    }}
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
