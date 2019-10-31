import React, { Suspense } from 'react'
import { Switch, RouteComponentProps, Route, Redirect } from 'react-router-dom'

import FLXSplashLoader from 'Components/SplashLoader'

const RMLogin = React.lazy(() => import('./Login'))
const RMPasswordRecovery = React.lazy(() => import('./PasswordRecovery'))

const RMAuth: React.FC<RouteComponentProps> = ({ match: { url } }) => (
    <Suspense fallback={<FLXSplashLoader />}>
        <Switch>
            <Route path={`${url}/entrar`} component={RMLogin} />
            <Route
                path={`${url}/recuperar-senha`}
                component={RMPasswordRecovery}
            />
            <Route
                path={`${url}/`}
                render={() => <Redirect to={`${url}/entrar`} />}
            />
        </Switch>
    </Suspense>
)

export default RMAuth
