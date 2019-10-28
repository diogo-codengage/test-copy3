import React, { Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { SANScrollTop } from '@sanar/components'

import 'App.less'
import RMSplashLoader from 'Components/SplashLoader'
import RMPrivateRoute from 'Pages/Private/PrivateRoute'

const RMAuth = React.lazy(() => import('Pages/Auth'))
const RMPrivatePages = React.lazy(() => import('Pages/Private'))

const RMApp: React.FC = () => (
    <Suspense fallback={<RMSplashLoader />}>
        <Router>
            <SANScrollTop>
                <Switch>
                    <Route path='/auth' component={RMAuth} />
                    <RMPrivateRoute path='/portal' component={RMPrivatePages} />
                    <Route render={() => <Redirect to='/auth' />} />
                </Switch>
            </SANScrollTop>
        </Router>
    </Suspense>
)

export default RMApp
