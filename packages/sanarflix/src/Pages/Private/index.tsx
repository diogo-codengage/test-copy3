import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import FLXLayout from 'Pages/Layout'
import FLXSplashLoader from 'Components/SplashLoader'

const FLXHome = React.lazy(() => import('./Home'))

type FLXPrivatePages = {}

const FLXPrivatePages: React.FC<RouteComponentProps<FLXPrivatePages>> = ({
    match: { url }
}) => {
    return (
        <FLXLayout>
            <Suspense fallback={<FLXSplashLoader />}>
                <Switch>
                    <Route path={`${url}/inicio`} component={FLXHome} />
                    <Route
                        path={[`${url}`, `${url}/`]}
                        render={() => <Redirect to={`${url}/inicio`} />}
                    />
                </Switch>
            </Suspense>
        </FLXLayout>
    )
}

export default FLXPrivatePages