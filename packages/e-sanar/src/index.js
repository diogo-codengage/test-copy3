import React from 'react'
import ReactDOM from 'react-dom'
import SANApp from './App'

import SANGraphQLProvider from './Apollo/GraphQLService'
import { SANAuthProvider } from './Hooks/auth'

import './Config/i18n'

const SANRootComponent = () => (
    <SANGraphQLProvider>
        <SANAuthProvider>
            <SANApp />
        </SANAuthProvider>
    </SANGraphQLProvider>
)

ReactDOM.render(<SANRootComponent />, document.getElementById('root'))
