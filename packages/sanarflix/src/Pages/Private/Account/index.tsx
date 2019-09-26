import React from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'

const SANMyData = React.lazy(() => import('./MyData'))
const SANPausePage = React.lazy(() => import('./Pause'))
const SANCancelPage = React.lazy(() => import('./Cancel'))
const SANPayment = React.lazy(() => import('./Payment'))
const SANChangePassword = React.lazy(() => import('./ChangePassword'))

const FLXAccount = ({ match: { url } }: RouteComponentProps) => (
    <Switch>
        <Route path={`${url}/meus-dados`} component={SANMyData} />
        <Route path={`${url}/pause-assinatura`} component={SANPausePage} />
        <Route path={`${url}/cancelar-assinatura`} component={SANCancelPage} />
        <Route path={`${url}/formas-pagamento`} component={SANPayment} />
        <Route path={`${url}/alterar-senha`} component={SANChangePassword} />
        <Route
            path={[`${url}`, `${url}/`]}
            render={() => <Redirect to={`${url}/meus-dados`} />}
        />
    </Switch>
)

export default FLXAccount
