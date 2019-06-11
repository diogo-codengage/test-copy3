import React, { Suspense, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { LocaleProvider as ANTLocaleProvider } from 'antd'
import pt_FR from 'antd/lib/locale-provider/pt_BR'

import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ESSplashLoader from 'sanar-ui/dist/Components/Atoms/SplashLoader'

import image from 'assets/images/logo.svg'

import './App.less'
import SANAuth from 'Pages/Auth'
import SANPortalRoutes from 'Pages/Portal'
import PrivateRoute from 'Pages/Portal/Private/Private'

import { esConfigureAuthStorage } from 'sanar-ui/dist/Util/Auth'

//TODO Start use lazy loading
const SANApp = () => {
    useEffect(() => {
        esConfigureAuthStorage()
    })

    return (
        <Suspense fallback={<ESSplashLoader image={image} />}>
            <ANTLocaleProvider locale={pt_FR}>
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
                                            <Route
                                                path='/auth'
                                                component={SANAuth}
                                            />
                                            <PrivateRoute
                                                path='/aluno'
                                                component={SANPortalRoutes}
                                            />
                                            <Route
                                                path='*'
                                                render={() => (
                                                    <Redirect to='/aluno' />
                                                )}
                                            />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            )
                        }}
                    />
                </Router>
            </ANTLocaleProvider>
        </Suspense>
    )
}

export default SANApp
