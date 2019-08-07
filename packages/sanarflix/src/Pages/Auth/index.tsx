import React, { Suspense } from 'react'
import FLXSplashLoader from 'Components/SplashLoader'
import { Switch, RouteComponentProps, Route, Redirect } from 'react-router-dom'

const FLXSingIn = React.lazy(() => import('./SignIn'))

type FLXAuthProps = {}
const FLXAuth: React.FC<RouteComponentProps<FLXAuthProps>> = ({
    match: { url }
}) => {
    return (
        <Suspense fallback={<FLXSplashLoader />}>
            <Switch>
                <Route path={`${url}/signin`} component={FLXSingIn} />
                <Route
                    exact
                    path={[`${url}/`, `${url}`]}
                    render={() => <Redirect to={`${url}/signin`} />}
                />
            </Switch>
        </Suspense>
    )
}

export default FLXAuth
