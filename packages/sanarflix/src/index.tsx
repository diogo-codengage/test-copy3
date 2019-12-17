import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'
import * as Sentry from '@sentry/browser';

import 'sanar-ui/dist/Config/i18n'

import FLXGraphQLProvider from './Apollo/GraphQLService'
import { FLXAuthProvider } from './Hooks/auth'
import { FLXGlobalStyle } from './Styles'
import { FLXThemeProvider } from 'Hooks/theme'
import { SANSnackbarProvider } from '@sanar/components'

import 'sanar-ui/dist/Config/i18n'

const FLXApp: React.FC = () => (
    <FLXGraphQLProvider>
        <Router>
            <FLXAuthProvider>
                <FLXThemeProvider>
                    <SANSnackbarProvider>
                        <>
                            <FLXGlobalStyle />
                            <App />
                        </>
                    </SANSnackbarProvider>
                </FLXThemeProvider>
            </FLXAuthProvider>
        </Router>
    </FLXGraphQLProvider>
)

Sentry.init({ dsn: `${process.env.REACT_APP_SENTRY_DSN}` });
ReactDOM.render(<FLXApp />, document.getElementById('root'))
serviceWorker.register()
