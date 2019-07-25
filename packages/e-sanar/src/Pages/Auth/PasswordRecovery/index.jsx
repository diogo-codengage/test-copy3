import React from 'react'
import { Switch, Route } from 'react-router-dom'

const SANSendPasswordRecovery = React.lazy(() =>
    import('./SendPasswordRecovery')
)
const SANPasswordRecoverySent = React.lazy(() =>
    import('./PasswordRecoverySent')
)
const SANResetPassword = React.lazy(() => import('./ResetPassword'))

const SANPasswordRecovery = ({ match: { url } }) => {
    return (
        <Switch>
            <Route path={`${url}/`} exact component={SANSendPasswordRecovery} />
            <Route
                path={`${url}/sucesso`}
                component={SANPasswordRecoverySent}
            />
            <Route path={`${url}/nova`} component={SANResetPassword} />
        </Switch>
    )
}

export default SANPasswordRecovery
