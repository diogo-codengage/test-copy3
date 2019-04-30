import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import HomePage from './Pages/Portal/Home'
import SigninPage from './Pages/Auth/Signin'
import PasswordRecoveryPage from './Pages/Auth/PasswordRecovery'
import SignupPage from './Pages/Auth/Signup'

// Import Sanar UI components library
import 'sanar-ui/dist/index.less'

// Routes to Portal modules
import SANPortalRoutes from './Pages/Portal'

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io'
})

function ESRouter() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Route path='/' component={HomePage} />
                <Route path='/signin' component={SigninPage} />
                <Route path='/signup' component={SignupPage} />
                <Route
                    path='/password-recovery'
                    component={PasswordRecoveryPage}
                />
                <Route path='/portal' component={SANPortalRoutes} />
            </Router>
        </ApolloProvider>
    )
}

const Loader = () => <div>loading...</div>

export default function App() {
    return (
        <Suspense fallback={<Loader />}>
            <ESRouter />
        </Suspense>
    )
}
