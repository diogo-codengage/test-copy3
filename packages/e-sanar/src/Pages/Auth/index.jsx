import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import SANSigninPage from './Signin'
import SANPasswordRecovery from './PasswordRecovery'
import SANCreatePassword from './CreatePassword'

// const SANSigninPage = lazy(() => import('./Signin'))
// const SANPasswordRecoveryPage = lazy(() => import('./PasswordRecovery'))

const SANAuth = ({ match: { url } }) => (
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
                                path={`${url}/signin`}
                                component={SANSigninPage}
                            />
                            <Route
                                path={`${url}/recuperar-senha`}
                                component={SANPasswordRecovery}
                            />
                            <Route
                                path={`${url}/criar-senha`}
                                component={SANCreatePassword}
                            />
                            <Route
                                path={[`${url}/*`, `${url}`]}
                                render={() => <Redirect to={`${url}/signin`} />}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )
        }}
    />
)

export default SANAuth
