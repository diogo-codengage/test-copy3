import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { LocaleProvider as ANTLocaleProvider } from 'antd'
import pt_FR from 'antd/lib/locale-provider/pt_BR'

import './App.less'

const SANAuth = lazy(() => import('./Pages/Auth'))
const SANPortalRoutes = lazy(() => import('./Pages/Portal'))
const SANPrivateRoute = lazy(() => import('./Pages/Portal/Private'))

const SANLoader = () => <div>loading...</div>

const SANApp = () => (
    <Suspense fallback={<SANLoader />}>
        <ANTLocaleProvider locale={pt_FR}>
            <Router>
                <Switch>
                    <Route path='/auth' component={SANAuth} />
                    <SANPrivateRoute
                        path='/aluno'
                        component={SANPortalRoutes}
                    />
                    <Route
                        exact
                        path='*'
                        render={() => <Redirect to='/aluno' />}
                    />
                </Switch>
            </Router>
        </ANTLocaleProvider>
    </Suspense>
)

export default SANApp
