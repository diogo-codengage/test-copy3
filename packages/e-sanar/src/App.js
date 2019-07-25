import React, { Suspense, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { LocaleProvider as ANTLocaleProvider } from 'antd'
import pt_FR from 'antd/lib/locale-provider/pt_BR'

import './App.less'

import { esConfigureAuthStorage } from 'sanar-ui/dist/Util/Auth'
import ESNotFoundError from 'Pages/Portal/Errors/NotFound'

import SANSplashLoader from 'Components/SplashLoader'

const SANAuth = React.lazy(() => import('Pages/Auth'))
const SANPortalRoutes = React.lazy(() => import('Pages/Portal'))
const PrivateRoute = React.lazy(() => import('Pages/Portal/Private/Private'))

const SANApp = () => {
    useEffect(() => {
        esConfigureAuthStorage()
    })

    return (
        <Suspense fallback={<SANSplashLoader />}>
            <ANTLocaleProvider locale={pt_FR}>
                <Router>
                    <Switch>
                        <Route path='/auth' component={SANAuth} />
                        <PrivateRoute
                            path='/aluno'
                            component={SANPortalRoutes}
                        />
                        <Route
                            path={[`$/`, ``]}
                            exact
                            render={() => <Redirect to={`/aluno`} />}
                        />
                        <Route component={ESNotFoundError} />
                    </Switch>
                </Router>
            </ANTLocaleProvider>
        </Suspense>
    )
}

export default SANApp
