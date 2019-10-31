import React, { useState, useEffect } from 'react'
import {
    Route,
    Redirect,
    withRouter,
    RouteComponentProps
} from 'react-router-dom'

import { CognitoUserSession } from 'amazon-cognito-identity-js'

import { useAuthContext } from 'Hooks/auth'
import { logout, getCognitoUser } from 'Config/AWSCognito'

interface RMPrivateRouteProps extends RouteComponentProps {
    component: React.ElementType
    path: string
}

const RMPrivateRoute: React.FC<RMPrivateRouteProps> = ({
    component: Component,
    history,
    ...rest
}) => {
    const { setMe } = useAuthContext()
    const [logged, setLogged] = useState(true)

    const onLogout = () => {
        history.push('/auth/entrar')
        setMe(undefined)
        setLogged(false)
    }

    useEffect(() => {
        const cognitoUser = getCognitoUser()

        if (!!cognitoUser) {
            cognitoUser.getSession((err: any, session: CognitoUserSession) => {
                if (session.isValid()) {
                } else {
                    logout({ callback: onLogout })
                }
            })
        } else {
            onLogout()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Route
            {...rest}
            render={props =>
                logged ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/auth/signin' />
                )
            }
        />
    )
}

export default withRouter(RMPrivateRoute)
