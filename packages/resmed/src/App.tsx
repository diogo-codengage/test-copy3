import React, { Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { SANScrollTop } from '@sanar/components'

import './App.less'
import FLXSplashLoader from './Components/SplashLoader'

const RMAuth = React.lazy(() => import('Pages/Auth'))

const RMApp: React.FC = () => {
    return (
        <Suspense fallback={<FLXSplashLoader />}>
            <Router>
                <SANScrollTop>
                    <Switch>
                        <Route path='/auth' component={RMAuth} />
                        <Route
                            path='/portal'
                            render={() => <div>inicio</div>}
                        />
                        <Route render={() => <Redirect to='/auth' />} />
                    </Switch>
                </SANScrollTop>
            </Router>
        </Suspense>
    )
}

export default RMApp
