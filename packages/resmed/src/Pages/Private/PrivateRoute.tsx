import React, { useState, useEffect, memo } from 'react'
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

import { segmentTrack } from 'Config/Segment/track'

import RMModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'
import RMSplashLoader from 'Components/SplashLoader'

import { RMComplementaryRegisterModal } from 'Components/ComplementaryRegister'

interface RMPrivateRouteProps extends RouteComponentProps {
    component: React.ElementType
    path: string
}

const RMPrivateRoute = memo<RMPrivateRouteProps>(
    ({ component: Component, history, ...rest }) => {
        const client = useApolloClient()
        const { setMe, me } = useAuthContext()
        const [logged, setLogged] = useState(true)
        const [loading, setLoading] = useState(true)

        const onLogout = () => {
            setMe(undefined)
            setLogged(false)
        }

        const fetchMe = async () => {
            setLoading(true)
            try {
                const {
                    data: { me }
                } = await client.query({ query: GET_ME })
                segmentTrack('Session started')
                setMe(me)
            } catch {
                logout({ callback: onLogout })
            }
            setLoading(false)
        }

        useEffect(() => {
            const cognitoUser = getCognitoUser()

            if (!!cognitoUser) {
                cognitoUser.getSession(
                    (err: any, session: CognitoUserSession) => {
                        if (!!session && session.isValid()) {
                            fetchMe()
                        } else {
                            logout({ callback: onLogout })
                        }
                    }
                )
            } else {
                onLogout()
                setLoading(false)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        if (loading) return <RMSplashLoader />

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

        if (!!me && !me.profile) {
            return <RMComplementaryRegisterModal />
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
)

export default withRouter(RMPrivateRoute)
