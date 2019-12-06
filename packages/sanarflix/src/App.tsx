import React, { Suspense, useMemo, useEffect, useState } from 'react'
import {
    Switch,
    Route,
    Redirect,
    withRouter,
    RouteComponentProps
} from 'react-router-dom'

import { SANScrollTop } from '@sanar/components'

import FLXPrivateRoute from './Pages/Private/PrivateRoute'
import FLXSplashLoader from './Components/SplashLoader'

import './App.less'

import { useAuthContext } from 'Hooks/auth'
import { getInstance } from 'Config/AWSCognito'

const FLXAuth = React.lazy(() => import('./Pages/Auth'))
const FLXPrivatePages = React.lazy(() => import('./Pages/Private'))

const App: React.FC<RouteComponentProps> = ({ history, location }) => {
    const { me, setMe } = useAuthContext()
    const [loading, setLoading] = useState(true)

    const path = useMemo(() => (!!me ? '/portal/inicio' : '/auth/signin'), [me])

    useEffect(() => {
        getInstance().user.getSession((_, result) => {
            if (!result) {
                setMe(undefined)
            } else {
                window.localStorage.clear();
                const { pathname } = location
                pathname.includes('auth') && history.push('/portal/inicio')
            }
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <FLXSplashLoader />
    }

    return (
        <Suspense fallback={<FLXSplashLoader />}>
            <SANScrollTop>
                <Switch>
                    <Route path='/auth' component={FLXAuth} />
                    <FLXPrivateRoute
                        path='/portal'
                        component={FLXPrivatePages}
                    />
                    <Route render={() => <Redirect to={path} />} />
                </Switch>
            </SANScrollTop>
        </Suspense>
    )
}

export default withRouter(App)
