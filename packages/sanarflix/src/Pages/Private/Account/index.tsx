import React from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'

const SANMyData = React.lazy(() => import('./MyData'))
const SANPausePage = React.lazy(() => import('./Pause'))

type FLXPrivatePages = {}

const FLXAccount: React.FC<RouteComponentProps<FLXPrivatePages>> = ({
    match: { url }
}) => (
    <Switch>
        <Route path={`${url}/meus-dados`} component={SANMyData} />
        <Route path={`${url}/pause-assinatura`} component={SANPausePage} />
        <Route
            path={[`${url}`, `${url}/`]}
            render={() => <Redirect to={`${url}/meus-dados`} />}
        />
    </Switch>
)

export default FLXAccount
