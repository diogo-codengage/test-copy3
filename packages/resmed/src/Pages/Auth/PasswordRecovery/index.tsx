import React from 'react'
import { RouteComponentProps, Switch, Route } from 'react-router'
import styled from 'styled-components'

const RMSendPasswordRecovery = React.lazy(() =>
    import('./SendPasswordRecovery')
)
const RMPasswordRecoverySent = React.lazy(() =>
    import('./PasswordRecoverySent')
)
const RMResetPassword = React.lazy(() => import('./ResetPassword'))

const RMPasswordRecoveryAlignment = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const RMPasswordRecovery: React.FC<RouteComponentProps> = ({
    match: { url }
}) => (
    <RMPasswordRecoveryAlignment>
        <Switch>
            <Route path={`${url}/sucesso`} component={RMPasswordRecoverySent} />
            <Route path={`${url}/nova`} component={RMResetPassword} />
            <Route
                path={[`${url}/`, `${url}`]}
                component={RMSendPasswordRecovery}
            />
        </Switch>
    </RMPasswordRecoveryAlignment>
)

export default RMPasswordRecovery
