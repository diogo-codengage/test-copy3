import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as Sentry from '@sentry/browser'

import { HashRouter as BrowserRouter } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import { createBrowserHistory } from 'history'

import 'sanar-ui/dist/Config/i18n'

import { SANSnackbarProvider } from '@sanar/components'
import { version } from 'Config/Version'
import { RMGraphQLProvider } from './Apollo/GraphQLService'
import { RMThemeProvider } from './Components/Theme'
import { RMAuthProvider } from './Hooks/auth'
import { RMGlobalStyle } from './Styles'

const history = createBrowserHistory();

history.listen(location => {
    console.log('change location', location.pathname)
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
});

const RMApp: React.FC = () => (
    <RMGraphQLProvider>
        <BrowserRouter>
            <LastLocationProvider>
                <RMThemeProvider>
                    <SANSnackbarProvider>
                        <RMAuthProvider>
                            <>
                                <RMGlobalStyle />
                                <App />
                            </>
                        </RMAuthProvider>
                    </SANSnackbarProvider>
                </RMThemeProvider>
            </LastLocationProvider>
        </BrowserRouter>
    </RMGraphQLProvider>
)

if (process.env.NODE_ENV === 'production')
    Sentry.init({
        dsn: `${process.env.REACT_APP_SENTRY_DSN}`,
        release: version
    })
ReactDOM.render(<RMApp />, document.getElementById('root'))
serviceWorker.register()
ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS}`)
