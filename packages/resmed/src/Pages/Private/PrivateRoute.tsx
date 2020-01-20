import React, { useState, useEffect, memo } from 'react'
import {
    Route,
    Redirect,
    withRouter,
    RouteComponentProps
} from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'

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
        const [getMe, { loading }] = useLazyQuery(GET_ME, {
            onCompleted({ me }) {
                segmentTrack('Session started')
                setMe(me)
            },
            onError() {
                logout({ callback: onLogout })
            }
        })
        const { setMe, me } = useAuthContext()
        const [logged, setLogged] = useState(true)

        const onLogout = () => {
            setMe(undefined)
            setLogged(false)
        }

        const fetchMe = async () => {
            try {
                getMe()
            } catch {
                logout({ callback: onLogout })
            }
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

        if (!!me && !me.userMedUniversity) {
            return <RMComplementaryRegisterModal visible />
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
