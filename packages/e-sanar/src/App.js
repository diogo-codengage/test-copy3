import React, { Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ESSplashLoader from 'sanar-ui/dist/Components/Atoms/SplashLoader'

import image from 'assets/images/logo.svg'

import './App.less'
import SANAuth from 'Pages/Auth'
import SANPortalRoutes from 'Pages/Portal'
import PrivateRoute from 'Pages/Portal/Private/Private'

// const SANAuth = lazy(() => import('./Pages/Auth'))
// const SANPortalRoutes = lazy(() => import('./Pages/Portal'))
// const SANPrivateRoute = lazy(() => import('./Pages/Portal/Private'))

const SANApp = () => (
    <Suspense fallback={<ESSplashLoader image={image} />}>
        <Router>
            <Route
                render={({ location }) => {
                    return (
                        <TransitionGroup>
                            <CSSTransition
                                key={location.pathname}
                                classNames='app-routes-transition'
                                timeout={300}
                            >
                                <Switch>
                                    <Route path='/auth' component={SANAuth} />
                                    <PrivateRoute
                                        path='/aluno'
                                        component={SANPortalRoutes}
                                    />
                                    <Route
                                        path='*'
                                        render={() => <Redirect to='/aluno' />}
                                    />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )
                }}
            />
        </Router>
    </Suspense>
)

export default SANApp
