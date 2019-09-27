import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getInstance } from 'Config/AWSCognito'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

const config = getInstance()

setInterval(async () => {
    const cognitoUser = config.userPool.getCurrentUser()
    if (cognitoUser) {
        cognitoUser.getSession((_, session) => {
            cognitoUser.refreshSession(
                session.getRefreshToken(),
                (_, s: CognitoUserSession) => {}
            )
        })
    }
}, /* 10 minutes */ 10 * 60 * 1000)

const getValidSession = cognitoUser => {
    return cognitoUser.getSession((_, session: CognitoUserSession) => {
        if (session.isValid()) return session
    })
}

const getAccessToken = async () => {
    const cognitoUser = config.userPool.getCurrentUser()

    if (!!cognitoUser) {
        const session = getValidSession(cognitoUser)

        return session.getIdToken().getJwtToken()
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
