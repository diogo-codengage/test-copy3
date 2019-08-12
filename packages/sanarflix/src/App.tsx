import React, { Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import FLXPrivateRoute from './Pages/Private/PrivateRoute'

import './App.less'
import FLXSplashLoader from './Components/SplashLoader'

const FLXAuth = React.lazy(() => import('./Pages/Auth'))
const FLXPrivatePages = React.lazy(() => import('./Pages/Private'))

const App: React.FC = () => {
    return (
        <Suspense fallback={<FLXSplashLoader />}>
            <Router>
                <Switch>
                    <Route path='/auth' component={FLXAuth} />
                    <FLXPrivateRoute
                        path='/portal'
                        component={FLXPrivatePages}
                    />
                    <Route
                        path={['/', '']}
                        exact
                        render={() => <Redirect to='/portal' />}
                    />
                    <Route path='*' render={() => <h1>Not found</h1>} />
                </Switch>
            </Router>
        </Suspense>
    )
}

export default App
