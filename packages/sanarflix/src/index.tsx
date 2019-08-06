import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import FLXGraphQLProvider from './Apollo/GraphQLService'
import { FLXAuthProvider } from './Hooks/auth'
import { ThemeProvider } from 'styled-components'
import FLXTheme from './Styles/Theme'
import { FLXGlobalStyle } from './Styles'

const FLXApp: React.FC = () => (
    <FLXGraphQLProvider>
        <FLXAuthProvider>
            <ThemeProvider theme={FLXTheme}>
                <>
                    <FLXGlobalStyle />
                    <App />
                </>
            </ThemeProvider>
        </FLXAuthProvider>
    </FLXGraphQLProvider>
)

ReactDOM.render(<FLXApp />, document.getElementById('root'))
serviceWorker.unregister()
