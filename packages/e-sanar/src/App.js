import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.less'

const SANPortalRoutes = lazy(() => import('./Pages/Portal'))
const SANSigninPage = lazy(() => import('./Pages/Auth/Signin'))
const SANPasswordRecoveryPage = lazy(() =>
    import('./Pages/Auth/PasswordRecovery')
)
const SANSignupPage = lazy(() => import('./Pages/Auth/Signup'))
const SANPrivateRoute = lazy(() => import('./Pages/Portal/Private'))

const SANRouter = () => (
    <Router>
        <Route path='/signin' component={SANSigninPage} />
        <Route path='/signup' component={SANSignupPage} />
        <Route path='/password-recovery' component={SANPasswordRecoveryPage} />
        <SANPrivateRoute path='/' component={SANPortalRoutes} />
    </Router>
)

const SANLoader = () => <div>loading...</div>

const SANApp = () => (
    <Suspense fallback={<SANLoader />}>
        <SANRouter />
    </Suspense>
)

export default SANApp
