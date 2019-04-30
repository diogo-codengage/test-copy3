import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from './Private'
import SANCoursePage from './Course'
import SANPortalLayout from './Layout'

const SANPortalRoutes = () => {
    return (
        <SANPortalLayout>
            <Switch>
                <PrivateRoute path='/portal/course' component={SANCoursePage} />
            </Switch>
        </SANPortalLayout>
    )
}

export default SANPortalRoutes
