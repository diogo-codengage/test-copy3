import React, { Suspense, useMemo } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { SANScrollTop } from '@sanar/components'

import FLXPrivateRoute from './Pages/Private/PrivateRoute'

import './App.less'
import FLXSplashLoader from './Components/SplashLoader'

import { useAuthContext } from 'Hooks/auth'

const FLXAuth = React.lazy(() => import('./Pages/Auth'))
const FLXPrivatePages = React.lazy(() => import('./Pages/Private'))

const App: React.FC = () => {
    const { me } = useAuthContext()

    const path = useMemo(() => (!!me ? '/portal/inicio' : '/auth/signin'), [me])

    return (
        <Suspense fallback={<FLXSplashLoader />}>
            <Router>
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
            </Router>
        </Suspense>
    )
}

export default App
