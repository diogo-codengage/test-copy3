import React from 'react'
import ReactDOM from 'react-dom'
import SANApp from './App'
import Amplify from 'aws-amplify'
import 'normalize.css'

import registerServiceWorker from 'registerServiceWorker'

import SANGraphQLProvider from 'Apollo/GraphQLService'
import { SANAuthProvider } from 'Hooks/auth'
import { SANApolloProvider } from 'Hooks/apollo'

import 'sanar-ui/dist/Config/i18n'
import AWSAmplifyConfig from 'Config/aws-amplify'

Amplify.configure(AWSAmplifyConfig)

const SANRootComponent = () => (
    <SANGraphQLProvider>
        <SANApolloProvider>
            <SANAuthProvider>
                <SANApp />
            </SANAuthProvider>
        </SANApolloProvider>
    </SANGraphQLProvider>
)

ReactDOM.render(<SANRootComponent />, document.getElementById('root'))
registerServiceWorker()
