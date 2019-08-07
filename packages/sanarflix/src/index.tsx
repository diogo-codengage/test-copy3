import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import FLXGraphQLProvider from './Apollo/GraphQLService'
import { FLXAuthProvider } from './Hooks/auth'
import { FLXGlobalStyle } from './Styles'
import { FLXThemeProvider } from 'Hooks/theme'

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
