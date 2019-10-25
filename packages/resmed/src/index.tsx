import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import 'sanar-ui/dist/Config/i18n'

import { RMThemeProvider } from './Components/Theme'
import { RMGlobalStyle } from './Styles'

const RMApp: React.FC = () => (
    <RMThemeProvider>
        <>
            <RMGlobalStyle />
            <App />
        </>
    </RMThemeProvider>
)

ReactDOM.render(<RMApp />, document.getElementById('root'))
serviceWorker.register()
