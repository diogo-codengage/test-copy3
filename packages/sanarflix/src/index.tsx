import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import 'sanar-ui/dist/Config/i18n'

import FLXGraphQLProvider from './Apollo/GraphQLService'
import { FLXAuthProvider } from './Hooks/auth'
import { FLXGlobalStyle } from './Styles'
import { FLXThemeProvider } from 'Hooks/theme'

import 'sanar-ui/dist/Config/i18n'

const FLXApp: React.FC = () => (
    <FLXGraphQLProvider>
        <FLXAuthProvider>
            <FLXThemeProvider>
                <>
                    <FLXGlobalStyle />
                    <App />
                </>
            </FLXThemeProvider>
        </FLXAuthProvider>
    </FLXGraphQLProvider>
)

ReactDOM.render(<FLXApp />, document.getElementById('root'))
serviceWorker.unregister()
