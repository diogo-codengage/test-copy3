import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const SANSigninPage = lazy(() => import('./Signin'))
const SANPasswordRecoveryPage = lazy(() => import('./PasswordRecovery'))
const SANSignupPage = lazy(() => import('./Signup'))

const SANAuth = ({ match: { url } }) => (
    <Switch>
        <Route path={`${url}/signin`} component={SANSigninPage} />
        <Route path={`${url}/signup`} component={SANSignupPage} />
        <Route
            path={`${url}/password-recovery`}
            component={SANPasswordRecoveryPage}
        />
        <Route
            exact
            path={[`${url}/*`, `${url}`]}
            render={() => <Redirect to={`${url}/signin`} />}
        />
    </Switch>
)

export default SANAuth
