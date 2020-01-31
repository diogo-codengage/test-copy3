import React, { Suspense } from 'react'
import FLXSplashLoader from 'Components/SplashLoader'
import { Switch, RouteComponentProps, Route, Redirect } from 'react-router-dom'

const FLXSingIn = React.lazy(() => import('./SignIn'))
const FLXPasswordRecovery = React.lazy(() => import('./PasswordRecovery'))

type FLXAuthProps = {}
const FLXAuth: React.FC<RouteComponentProps<FLXAuthProps>> = ({
    match: { url }
}) => {
    return (
        <Suspense fallback={<FLXSplashLoader />}>
            <Switch>
                <Route path={`${url}/signin`} component={FLXSingIn} />
                <Route
                    path={`${url}/recuperar-senha`}
                    component={FLXPasswordRecovery}
                />
                <Route
                    path='*'
                    render={() => <Redirect to={`${url}/signin`} />}
                />
            </Switch>
        </Suspense>
    )
}

export default FLXAuth
