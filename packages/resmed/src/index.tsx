import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { HashRouter as BrowserRouter } from 'react-router-dom'

import 'sanar-ui/dist/Config/i18n'

import { SANSnackbarProvider } from '@sanar/components'
import { RMGraphQLProvider } from './Apollo/GraphQLService'
import { RMThemeProvider } from './Components/Theme'
import { RMAuthProvider } from './Hooks/auth'
import { RMGlobalStyle } from './Styles'

const RMApp: React.FC = () => (
    <RMGraphQLProvider>
        <BrowserRouter>
            <SANSnackbarProvider>
                <RMAuthProvider>
                    <RMThemeProvider>
                        <>
                            <RMGlobalStyle />
                            <App />
                        </>
                    </RMThemeProvider>
                </RMAuthProvider>
            </SANSnackbarProvider>
        </BrowserRouter>
    </RMGraphQLProvider>
)

ReactDOM.render(<RMApp />, document.getElementById('root'))
serviceWorker.register()
