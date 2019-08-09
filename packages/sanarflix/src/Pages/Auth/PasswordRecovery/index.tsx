import React from 'react'
import { RouteComponentProps, Switch, Route } from 'react-router'
import styled from 'styled-components'

const FLXSendPasswordRecoveryPage = React.lazy(() =>
    import('./SendPasswordRecovery')
)
const FLXPasswordRecoverySentPage = React.lazy(() =>
    import('./PasswordRecoverySent')
)
const FLXResetPasswordPage = React.lazy(() => import('./ResetPassword'))

// TODO: criar meio de reaproveitar por meio da sanar-ui
// Baseado nas classes helpers do less
const FLXPasswordRecoveryAlignment = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const FLXPasswordRecovery: React.FC<RouteComponentProps<any>> = ({
    match: { url }
}) => {
    return (
        <FLXPasswordRecoveryAlignment>
            <Switch>
                <Route
                    path={`${url}/sucesso`}
                    component={FLXPasswordRecoverySentPage}
                />
                <Route path={`${url}/nova`} component={FLXResetPasswordPage} />
                <Route
                    path={[`${url}/`, `${url}`]}
                    component={FLXSendPasswordRecoveryPage}
                />
            </Switch>
        </FLXPasswordRecoveryAlignment>
    )
}

export default FLXPasswordRecovery
