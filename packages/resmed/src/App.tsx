import React, { Suspense, useEffect, useState, useMemo } from 'react'
import {
    Switch,
    Route,
    Redirect,
    withRouter,
    RouteComponentProps
} from 'react-router-dom'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

import { SANScrollTop } from '@sanar/components'

import 'App.less'
import { useAuthContext } from 'Hooks/auth'
import RMSplashLoader from 'Components/SplashLoader'
import RMPrivateRoute from 'Pages/Private/PrivateRoute'
import { getCognitoUser } from 'Config/AWSCognito'

const RMAuth = React.lazy(() => import('Pages/Auth'))
const RMPrivatePages = React.lazy(() => import('Pages/Private'))

const RMApp: React.FC<RouteComponentProps> = ({ history, location }) => {
    const { me, setMe } = useAuthContext()
    const [loading, setLoading] = useState(true)

    const path = useMemo(() => (!!me ? '/inicio' : '/auth/entrar'), [me])

    useEffect(() => {
        const cognitoUser = getCognitoUser()

        if (!!cognitoUser) {
            cognitoUser.getSession((_: any, session: CognitoUserSession) => {
                if (!session) {
                    setMe(undefined)
                    window.localStorage.clear()
                } else {
                    const { pathname } = location
                    pathname.includes('auth/entrar') && history.push('/inicio')
                }
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <RMSplashLoader />
    }

    return (
        <Suspense fallback={<RMSplashLoader />}>
            <SANScrollTop>
                <Switch>
                    <Route path='/auth' component={RMAuth} />
                    <RMPrivateRoute path='/inicio' component={RMPrivatePages} />
                    <Route render={() => <Redirect to={path} />} />
                </Switch>
            </SANScrollTop>
        </Suspense>
    )
}

export default withRouter(RMApp)
