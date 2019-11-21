import React, { useEffect } from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { useLayoutContext } from 'Pages/Layout/Context'

const SANMyData = React.lazy(() => import('./MyData'))
// const SANPayment = React.lazy(() => import('./Payment'))
const SANPausePage = React.lazy(() => import('./Pause'))
const SANCancelPage = React.lazy(() => import('./Cancel'))
const SANChangePassword = React.lazy(() => import('./ChangePassword'))

const FLXAccount = ({ match: { url } }: RouteComponentProps) => {
    const { setMenuTab } = useLayoutContext()

    useEffect(() => {
        setMenuTab(2)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Switch>
             <Route path={`${url}/meus-dados`} component={SANMyData} />
            <Route path={`${url}/pause-assinatura`} component={SANPausePage} />
            <Route
                path={`${url}/cancelar-assinatura`}
                component={SANCancelPage}
            />
            {/* <Route path={`${url}/formas-pagamento`} component={SANPayment} /> */}
            <Route
                path={`${url}/alterar-senha`}
                component={SANChangePassword}
            />
            <Route
                path={[`${url}`, `${url}/`]}
                render={() => <Redirect to={`${url}/alterar-senha`} />}
            />
        </Switch>
    )
}

export default FLXAccount
