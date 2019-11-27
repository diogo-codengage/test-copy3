import React, { useState, useEffect } from 'react'
import {
    Route,
    Redirect,
    withRouter,
    RouteComponentProps
} from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import { CognitoUserSession } from 'amazon-cognito-identity-js'

import { GET_ME } from 'Apollo/User/Queries/me'
import { useAuthContext } from 'Hooks/auth'
import { logout, getCognitoUser } from 'Config/AWSCognito'

import RMModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'

interface RMPrivateRouteProps extends RouteComponentProps {
    component: React.ElementType
    path: string
}

const RMPrivateRoute: React.FC<RMPrivateRouteProps> = ({
    component: Component,
    history,
    ...rest
}) => {
    const client = useApolloClient()
    const { setMe, me } = useAuthContext()
    const [logged, setLogged] = useState(true)

    const onLogout = () => {
        setMe(undefined)
        setLogged(false)
    }

    const fetchMe = async () => {
        try {
            const {
                data: { me }
            } = await client.query({ query: GET_ME })

            setMe(me)
        } catch {
            logout({ callback: onLogout })
        }
    }

    useEffect(() => {
        const cognitoUser = getCognitoUser()

        if (!!cognitoUser) {
            cognitoUser.getSession((err: any, session: CognitoUserSession) => {
                if (session.isValid()) {
                    fetchMe()
                } else {
                    logout({ callback: onLogout })
                }
            })
        } else {
            onLogout()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!!me && !me.hasActiveSubscription) {
        return (
            <RMModalTermsAndPrivacy
                tosRequired
                visible
                closable={false}
                defaultActiveKey={0}
                scrolling
            />
        )
    }

    return (
        <Route
            {...rest}
            render={props =>
                logged ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/auth/entrar' />
                )
            }
        />
    )
}

export default withRouter(RMPrivateRoute)
