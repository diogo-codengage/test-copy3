import React from 'react'
import ReactDOM from 'react-dom'
import SANApp from './App'
import Amplify from 'aws-amplify'

import SANGraphQLProvider from './Apollo/GraphQLService'
import { SANAuthProvider } from './Hooks/auth'

import 'sanar-ui/dist/Config/i18n'
import AWSAmplifyConfig from 'Config/aws-amplify'

import 'normalize.css'

Amplify.configure(AWSAmplifyConfig)

const SANRootComponent = () => (
    <SANGraphQLProvider>
        <SANAuthProvider>
            <SANApp />
        </SANAuthProvider>
    </SANGraphQLProvider>
)

ReactDOM.render(<SANRootComponent />, document.getElementById('root'))
