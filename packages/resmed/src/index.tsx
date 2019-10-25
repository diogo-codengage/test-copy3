import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import 'sanar-ui/dist/Config/i18n'

import { RMGraphQLProvider } from './Apollo/GraphQLService'
import { RMThemeProvider } from './Components/Theme'
import { RMGlobalStyle } from './Styles'

const RMApp: React.FC = () => (
    <RMGraphQLProvider>
        <RMThemeProvider>
            <>
                <RMGlobalStyle />
                <App />
            </>
        </RMThemeProvider>
    </RMGraphQLProvider>
)

ReactDOM.render(<RMApp />, document.getElementById('root'))
serviceWorker.register()
