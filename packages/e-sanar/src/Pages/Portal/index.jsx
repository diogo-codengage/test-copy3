import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SANCoursePage from './Course'
import SANPortalLayout from './Layout'

const SANPortalRoutes = () => {
    return (
        <SANPortalLayout>
            <Switch>
                <Route path='/course' component={SANCoursePage} />
                <Redirect
                    to={{
                        pathname: '/course'
                    }}
                />
            </Switch>
        </SANPortalLayout>
    )
}

export default SANPortalRoutes
