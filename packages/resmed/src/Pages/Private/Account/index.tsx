import React, { useEffect } from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'

import { useLayoutContext } from 'Pages/Private/Layout/Context'

const RMChangePassword = React.lazy(() => import('./ChangePassword'))
const RMComplementaryRegisterPage = React.lazy(() =>
    import('Components/ComplementaryRegister/ComplementaryRegisterPage')
)

const RMAccount = ({ match: { url } }: RouteComponentProps) => {
    const { setMenuTab } = useLayoutContext()

    useEffect(() => {
        setMenuTab(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Switch>
            <Route path={`${url}/alterar-senha`} component={RMChangePassword} />
            <Route
                path={`${url}/dados-complementares`}
                component={RMComplementaryRegisterPage}
            />
            <Route
                path={[`${url}`, `${url}/`]}
                render={() => <Redirect to={`${url}/alterar-senha`} />}
            />
        </Switch>
    )
}

export default RMAccount
