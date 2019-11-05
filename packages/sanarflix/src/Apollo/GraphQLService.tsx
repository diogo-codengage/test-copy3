import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getInstance } from 'Config/AWSCognito'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

const config = getInstance()

const getAccessToken = async () => {
    const cognitoUser = config.userPool.getCurrentUser()

    if (!!cognitoUser) {
        return cognitoUser.getSession((_, session: CognitoUserSession) => {
            if (session.isValid()) {
                return session.getIdToken().getJwtToken()
            } else {
                return cognitoUser.refreshSession(
                    session.getRefreshToken(),
                    (_, session: CognitoUserSession) => {
                        return session.getIdToken().getJwtToken()
                    }
                )
            }
        })
    }
}

const onError = ({ graphQLErrors, forward, operation, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(error => {
            if (error.message.includes('AUTH_REQUIRED')) {
                localStorage.clear()
                window.location.hash = '/#/auth'
            }
        })
        return forward(operation)
    }

    if (networkError) {
        console.error('[Network error]: %o', networkError)
        window.location.hash = '/#/portal/erro'
    }
}

const client = new ApolloClient({
    uri: process.env.REACT_APP_URL_API,
    onError,
    request: async operation =>
        operation.setContext({
            headers: {
                Authorization: await getAccessToken()
            }
        })
} as any)

const FLXGraphQLProvider = props => (
    <ApolloProvider client={client} {...props} />
)

export default FLXGraphQLProvider
