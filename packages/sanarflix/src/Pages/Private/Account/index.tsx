import React from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'

const SANMyData = React.lazy(() => import('./MyData'))
const SANPayment = React.lazy(() => import('./Payment'))

const FLXAccount = ({ match: { url } }: RouteComponentProps) => (
    <Switch>
        <Route path={`${url}/meus-dados`} component={SANMyData} />
        <Route path={`${url}/formas-pagamento`} component={SANPayment} />
        <Route
            path={[`${url}`, `${url}/`]}
            render={() => <Redirect to={`${url}/meus-dados`} />}
        />
    </Switch>
)

export default FLXAccount
