import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SANSendPasswordRecovery from './SendPasswordRecovery'
import SANPasswordRecoverySent from './PasswordRecoverySent'
import SANResetPassword from './ResetPassword'

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
