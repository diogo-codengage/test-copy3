import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SANSplashLoader from 'Components/SplashLoader'

const SANCreatePasswordPage = React.lazy(() => import('./CreatePassword'))
const SANSigninPage = React.lazy(() => import('./Signin'))
const SANPasswordRecoveryPage = React.lazy(() => import('./PasswordRecovery'))

const SANAuth = ({ match: { url } }) => (
    <Suspense fallback={<SANSplashLoader />}>
        <Switch>
            <Route path={`${url}/signin`} component={SANSigninPage} />
            <Route
                path={`${url}/recuperar-senha`}
                component={SANPasswordRecoveryPage}
            />
            <Route
                path={`${url}/criar-senha`}
                component={SANCreatePasswordPage}
            />
            <Route
                path={[`${url}/*`, `${url}`]}
                render={() => <Redirect to={`${url}/signin`} />}
            />
        </Switch>
    </Suspense>
)

export default SANAuth
