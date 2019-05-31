import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SANSigninPage from './Signin'
import SANPasswordRecovery from './PasswordRecovery'

// const SANSigninPage = lazy(() => import('./Signin'))
// const SANPasswordRecoveryPage = lazy(() => import('./PasswordRecovery'))

const SANAuth = ({ match: { url } }) => (
    <Switch>
        <Route path={`${url}/signin`} component={SANSigninPage} />
        <Route
            path={`${url}/recuperar-senha`}
            component={SANPasswordRecovery}
        />
        <Route
            path={[`${url}/*`, `${url}`]}
            render={() => <Redirect to={`${url}/signin`} />}
        />
    </Switch>
)

export default SANAuth
