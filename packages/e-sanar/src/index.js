import React from 'react'
import ReactDOM from 'react-dom'
import SANApp from './App'
import Amplify from 'aws-amplify'

import SANGraphQLProvider from './Apollo/GraphQLService'
import { SANAuthProvider } from './Hooks/auth'

import './Config/i18n'
import AWSAmplifyConfig from 'Config/aws-amplify'

Amplify.configure(AWSAmplifyConfig)

const SANRootComponent = () => (
    <SANGraphQLProvider>
        <SANAuthProvider>
            <SANApp />
        </SANAuthProvider>
    </SANGraphQLProvider>
)

ReactDOM.render(<SANRootComponent />, document.getElementById('root'))
