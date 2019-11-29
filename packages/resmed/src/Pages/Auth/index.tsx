import React, { Suspense, useEffect, useState } from 'react'
import { Switch, RouteComponentProps, Route, Redirect } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import RMSplashLoader from 'Components/SplashLoader'

import { getCognitoUser } from 'Config/AWSCognito'

import { segmentTrack } from 'Config/Segment/track'

const RMLogin = React.lazy(() => import('./Login'))
const RMPasswordRecovery = React.lazy(() => import('./PasswordRecovery'))
const RMNewPassword = React.lazy(() => import('./NewPassword'))

const RMAuth: React.FC<RouteComponentProps> = ({ match: { url } }) => {
    const client = useApolloClient()
    const [session, setSession] = useState({
        isValid: false,
        loading: true
    })

    const handleTrack = async () => {
        // User ID, Plataform ID, Date, Time, Device
        // const datetime = new Date()
        const data = {
            'Plataform ID': process.env.REACT_APP_PLATFORM_ID
            // Date: `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`,
            // Time: `${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`,
            // Device: null
        }
        segmentTrack(client, 'Session started', data)
    }

    useEffect(() => {
        const cognitoUser = getCognitoUser()

        if (!!cognitoUser) {
            cognitoUser.getSession((_, session) => {
                if (session.isValid()) {
                    handleTrack()
                    setSession({
                        loading: false,
                        isValid: true
                    })
                } else {
                    setSession({
                        loading: false,
                        isValid: false
                    })
                }
            })
        } else {
            setSession({
                loading: false,
                isValid: false
            })
        }
        return () => {
            client.cache.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (session.loading) {
        return <RMSplashLoader />
    }

    if (!session.loading && session.isValid) {
        return <Redirect to='/inicio/curso' />
    }

    return (
        <Suspense fallback={<RMSplashLoader />}>
            <Switch>
                <Route path={`${url}/entrar`} component={RMLogin} />
                <Route path={`${url}/nova-senha`} component={RMNewPassword} />
                <Route
                    path={`${url}/recuperar-senha`}
                    component={RMPasswordRecovery}
                />
                <Route
                    exact
                    path={[`${url}/`, `${url}`]}
                    render={() => <Redirect to={`${url}/entrar`} />}
                />
            </Switch>
        </Suspense>
    )
}

export default RMAuth
