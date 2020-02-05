import React, { Suspense, useEffect, useState, memo } from 'react'
import { Switch, RouteComponentProps, Route, Redirect } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import RMSplashLoader from 'Components/SplashLoader'

import { getCognitoUser } from 'Config/AWSCognito'
import { trySetTokenAutoLoginFromLocationSearch } from './Login/autoLoginSetToken'

const RMLogin = React.lazy(() => import('./Login'))
const RMPasswordRecovery = React.lazy(() => import('./PasswordRecovery'))
const RMNewPassword = React.lazy(() => import('./NewPassword'))

const RMAuth = memo<RouteComponentProps>(({ match: { url }, location }) => {
    const client = useApolloClient()
    const [session, setSession] = useState({
        isValid: false,
        loading: true
    })
    const params = new URLSearchParams(location.search)

    useEffect(() => {
        const verifyRedirecting = async () => {
            // console.log('login')
            await trySetTokenAutoLoginFromLocationSearch(params)

            // console.log('localStorage-autoLoginSetToken', localStorage)
            const cognitoUser = getCognitoUser()
            // console.log('logincognitoUser', cognitoUser)

            if (!!cognitoUser) {
                cognitoUser.getSession(async (_, session) => {
                    if (!!session && session.isValid()) {
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
        }
        verifyRedirecting()
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
})

export default RMAuth
