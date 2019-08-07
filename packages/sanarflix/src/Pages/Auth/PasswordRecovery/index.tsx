import React from 'react'
import { RouteComponentProps, Switch, Route } from 'react-router'

const FLXSendPasswordRecoveryPage = React.lazy(() =>
    import('./SendPasswordRecovery')
)

const FLXPasswordRecoverySentPage = React.lazy(() =>
    import('./PasswordRecoverySent')
)

const FLXPasswordRecovery: React.FC<RouteComponentProps<any>> = ({
    match: { url }
}) => {
    return (
        <Switch>
            <Route
                path={`${url}/sucesso`}
                component={FLXPasswordRecoverySentPage}
            />
            <Route
                path={[`${url}/`, `${url}`]}
                component={FLXSendPasswordRecoveryPage}
            />
        </Switch>
    )
}

export default FLXPasswordRecovery
